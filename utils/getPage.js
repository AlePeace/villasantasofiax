import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { fetchGraphQL } from "./fetchGraphQL";

const LOCALES = ["it", "en"];

// Lightweight scan of all pages to find the translation group for a given URI.
// Used when Polylang doesn't return translations via the primary nodeByUri query.
const getSupplementalTranslationUris = async (uri) => {
  const params = {
    query: `
      query AllPagesSlugMap {
        pages(first: 100) {
          nodes {
            uri
            language { code }
            translations {
              uri
              language { code }
            }
          }
        }
      }
    `,
  };

  const { data } = await fetchGraphQL(params, { next: { revalidate: 86400 } });
  const pages = data?.pages?.nodes || [];

  for (const page of pages) {
    const allUris = [page.uri, ...(page.translations?.map((t) => t.uri) || [])];
    if (!allUris.includes(uri)) continue;

    const map = {};
    const pageLocale = page.language?.code?.toLowerCase();
    if (pageLocale && page.uri) map[pageLocale] = page.uri;
    for (const t of page.translations || []) {
      const tLocale = t.language?.code?.toLowerCase();
      if (tLocale && t.uri) map[tLocale] = t.uri;
    }
    return map;
  }
  return null;
};

// Merges supplemental URI data when Polylang doesn't return all translations
const enrichTranslationUris = async (uri, existingMap) => {
  const hasAll = LOCALES.every((loc) => existingMap[loc]);
  if (hasAll) return existingMap;

  console.log(`[getPage] Translation map incomplete for "${uri}", running supplemental lookup`);
  const supplement = await getSupplementalTranslationUris(uri);
  if (!supplement) return existingMap;

  // existingMap takes precedence over supplemental data
  return { ...supplement, ...existingMap };
};

// Fallback per WPGraphQL + Polylang: nodeByUri non risolve URI di pagine tradotte.
// Cerca tra tutte le pagine quella che ha una traduzione con l'URI richiesto.
export const getPageByTranslationUri = async (uri, locale) => {
  console.log(`[getPage] Polylang fallback: cercando traduzione con uri "${uri}"`);

  const params = {
    query: `
      query AllPagesWithTranslations {
        pages(first: 100) {
          nodes {
            id
            title
            content
            blocks(postTemplate: false)
            language { code }
            translations {
              id
              title
              uri
              content
              blocks(postTemplate: false)
              language { code }
            }
          }
        }
      }
    `,
  };

  const { data } = await fetchGraphQL(params, { next: { revalidate: 86400 } });
  const pages = data?.pages?.nodes || [];

  // Cerca la pagina IT che ha una traduzione con l'uri richiesto
  for (const page of pages) {
    const match = page.translations?.find((t) => t.uri === uri);
    if (match) {
      console.log(`[getPage] ✅ Trovata via fallback: "${match.title}" (${match.language?.code})`);
      const blocks = cleanAndTransformBlocks(match.blocks);
      const wpSlug = match.uri?.split("/").filter(Boolean).pop() || null;
      const translationUris = { [page.language?.code?.toLowerCase()]: page.uri };
      page.translations?.forEach((t) => {
        const code = t.language?.code?.toLowerCase();
        if (code) translationUris[code] = t.uri;
      });
      return { blocks, content: match.content || null, title: match.title || null, wpSlug, translationUris };
    }
  }

  console.log(`[getPage] ❌ Nessuna traduzione trovata per uri "${uri}"`);
  return null;
};

export const getPage = async (uri, locale = "it") => {
  console.log(`[getPage] Fetching URI: "${uri}", locale: "${locale}"`);

  const params = {
    query: `
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            content
            blocks(postTemplate: false)
            language {
              code
            }
            translations {
              id
              title
              uri
              content
              blocks(postTemplate: false)
              language {
                code
              }
            }
          }
          ... on Post {
            id
            title
            content
            blocks(postTemplate: false)
            language {
              code
            }
            translations {
              id
              title
              uri
              content
              blocks(postTemplate: false)
              language {
                code
              }
            }
          }
        }
      }
    `,
    variables: { uri },
  };

  const { data, errors } = await fetchGraphQL(params, { next: { revalidate: 86400 } });

  if (errors) {
    console.error(`[getPage] GraphQL errors:`, JSON.stringify(errors, null, 2));
  }

  console.log(
    `[getPage] nodeByUri result:`,
    data?.nodeByUri
      ? `Found page "${data.nodeByUri.title}" (lang: ${data.nodeByUri.language?.code})`
      : "NULL - page not found",
  );

  if (data?.nodeByUri?.translations?.length > 0) {
    console.log(
      `[getPage] Available translations:`,
      data.nodeByUri.translations.map(
        (t) => `${t.language?.code}: "${t.title}" (${t.uri})`,
      ),
    );
  } else {
    console.log(`[getPage] No translations available`);
  }

  if (!data?.nodeByUri) {
    return null;
  }

  const page = data.nodeByUri;
  const pageLanguage = page.language?.code?.toLowerCase();

  const uriToSlug = (u) => u?.split("/").filter(Boolean).pop() || null;

  // Mappa { localeCode: uri } per tutte le traduzioni disponibili
  const buildTranslationUris = (basePage, currentLocale, currentUri) => {
    const map = { [currentLocale]: currentUri };
    basePage.translations?.forEach((t) => {
      const code = t.language?.code?.toLowerCase();
      if (code) map[code] = t.uri;
    });
    return map;
  };

  // Se la pagina trovata è già nella lingua richiesta, usala direttamente
  if (pageLanguage === locale) {
    console.log(`[getPage] ✅ Page is already in requested locale "${locale}"`);
    const blocks = cleanAndTransformBlocks(page.blocks);
    const translationUris = await enrichTranslationUris(
      uri,
      buildTranslationUris(page, locale, uri),
    );
    return {
      blocks,
      content: page.content || null,
      title: page.title || null,
      wpSlug: uriToSlug(uri),
      translationUris,
    };
  }

  // Altrimenti cerca tra le traduzioni
  const translation = page.translations?.find(
    (t) => t.language?.code?.toLowerCase() === locale,
  );

  if (translation) {
    console.log(`[getPage] ✅ Found translation in "${locale}": "${translation.title}"`);
    const blocks = cleanAndTransformBlocks(translation.blocks);
    // La pagina trovata è in un'altra lingua: costruiamo la mappa con la pagina base + le sue traduzioni
    const rawTranslationUris = { [pageLanguage]: page.uri };
    page.translations?.forEach((t) => {
      const code = t.language?.code?.toLowerCase();
      if (code) rawTranslationUris[code] = t.uri;
    });
    const translationUris = await enrichTranslationUris(uri, rawTranslationUris);
    return {
      blocks,
      content: translation.content || null,
      title: translation.title || null,
      wpSlug: uriToSlug(translation.uri),
      translationUris,
    };
  }

  console.log(`[getPage] ⚠️ No translation found for "${locale}", using fallback (${pageLanguage})`);
  const blocks = cleanAndTransformBlocks(page.blocks);
  const translationUris = await enrichTranslationUris(
    uri,
    buildTranslationUris(page, pageLanguage, uri),
  );
  return {
    blocks,
    content: page.content || null,
    title: page.title || null,
    wpSlug: uriToSlug(uri),
    translationUris,
  };
};
