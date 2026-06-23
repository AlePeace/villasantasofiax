import { fetchGraphQL } from "utils/fetchGraphQL";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://villasantasofia.it";

async function getAllPosts() {
  const params = {
    query: `
      query SitemapPostsQuery {
        posts(first: 100, where: { status: PUBLISH }) {
          nodes {
            uri
            modified
            language {
              code
            }
            translations {
              uri
              modified
              language {
                code
              }
            }
          }
        }
      }
    `,
  };

  try {
    const { data } = await fetchGraphQL(params, {
      next: { revalidate: 86400 },
    });
    return data?.posts?.nodes || [];
  } catch (err) {
    // Backend SiteGround instabile: non far abortire il build per la sitemap.
    console.error("[sitemap] getAllPosts fallito, uso fallback vuoto:", err);
    return [];
  }
}

async function getAllPages() {
  const params = {
    query: `
      query SitemapQuery {
        pages(first: 100, where: { status: PUBLISH }) {
          nodes {
            uri
            modified
            language {
              code
            }
            translations {
              uri
              modified
              language {
                code
              }
            }
          }
        }
      }
    `,
  };

  try {
    const { data } = await fetchGraphQL(params, {
      next: { revalidate: 86400 },
    });
    return data?.pages?.nodes || [];
  } catch (err) {
    // Backend SiteGround instabile: non far abortire il build per la sitemap.
    console.error("[sitemap] getAllPages fallito, uso fallback vuoto:", err);
    return [];
  }
}

function uriToUrl(uri) {
  // uri è un path tipo "/" o "/chi-siamo/" o "/en/about/"
  const path = uri.replace(/\/$/, "");
  return path ? `${SITE_URL}${path}` : SITE_URL;
}

export default async function sitemap() {
  const [pages, posts] = await Promise.all([getAllPages(), getAllPosts()]);
  const entries = [];
  const seenUris = new Set();
  const seenUrls = new Set();

  for (const page of pages) {
    const lang = page.language?.code?.toLowerCase();

    // Processa solo le pagine nella lingua di default (IT) per evitare duplicati
    if (lang !== "it" || seenUris.has(page.uri)) continue;

    seenUris.add(page.uri);
    const pageUrl = uriToUrl(page.uri);
    seenUrls.add(pageUrl);
    entries.push({
      url: pageUrl,
      lastModified: new Date(page.modified),
      changeFrequency: "monthly",
      priority: page.uri === "/" ? 1.0 : 0.8,
    });

    // Aggiungi le traduzioni
    for (const translation of page.translations || []) {
      if (seenUris.has(translation.uri)) continue;
      seenUris.add(translation.uri);
      entries.push({
        url: uriToUrl(translation.uri),
        lastModified: new Date(translation.modified),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Aggiungi i post al sitemap
  const seenPostUris = new Set();
  for (const post of posts) {
    const lang = post.language?.code?.toLowerCase();
    if (lang !== "it" || seenPostUris.has(post.uri)) continue;

    seenPostUris.add(post.uri);
    entries.push({
      url: uriToUrl(post.uri),
      lastModified: new Date(post.modified),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const translation of post.translations || []) {
      if (seenPostUris.has(translation.uri)) continue;
      seenPostUris.add(translation.uri);
      entries.push({
        url: uriToUrl(translation.uri),
        lastModified: new Date(translation.modified),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Fallback: garantisci sempre le homepage IT/EN nella sitemap, anche se
  // WordPress era irraggiungibile durante il build (sitemap mai vuota/invalida).
  const fallbackUrls = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/en`, priority: 0.7 },
  ];
  for (const { url, priority } of fallbackUrls) {
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
    });
  }

  return entries;
}
