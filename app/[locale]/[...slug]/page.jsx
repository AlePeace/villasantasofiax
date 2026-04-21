import { BlockRenderer } from "components/BlockRenderer";
import { getPage, getPageByTranslationUri } from "utils/getPage";
import { getFooter } from "utils/getFooter";
import { getWpContent } from "utils/getWpContent";
import { Footer } from "components/Footer";
import { TranslationsSync } from "components/TranslationsSync";
import { getSeo } from "utils/getSeo";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const slugPath = slug.join("/");
  const uri = locale === "it" ? `/${slugPath}/` : `/${locale}/${slugPath}/`;

  // getPage ora gestisce sia Page che Post grazie al frammento ... on Post
  let data = await getPage(uri, locale);

  if (!data && locale !== "it") {
    data = await getPage(`/${slugPath}/`, locale);
  }
  if (!data && locale !== "it") {
    data = await getPage(`/${slugPath}/`, "it");
  }
  // Fallback Polylang: nodeByUri non risolve URI di pagine tradotte
  if (!data && locale !== "it") {
    data = await getPageByTranslationUri(uri, locale);
  }

  if (!data) {
    notFound();
  }

  const { blocks, title, wpSlug, translationUris } = data;

  // Pagine con blocchi Gutenberg personalizzati riconoscibili dal BlockRenderer
  const hasKnownBlocks = blocks?.some((b) => b.name === "core/group");

  if (hasKnownBlocks) {
    return (
      <div className={`page-${slug[0]}`}>
        <TranslationsSync translations={translationUris} />
        <BlockRenderer blocks={blocks} />
      </div>
    );
  }

  // Usa wpSlug (slug reale della pagina WP nella lingua corretta) per la REST API
  const [footerBlock, content] = await Promise.all([
    getFooter(),
    getWpContent(wpSlug || slug[slug.length - 1], locale),
  ]);

  return (
    <div className={`page-${slug[0]}`}>
      <TranslationsSync translations={translationUris} />
      <article className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        {title && (
          <h1 className="font-montecatini text-blue text-3xl lg:text-5xl mb-10">
            {title}
          </h1>
        )}
        {content && (
          <div
            className="font-nunito text-blue/80 text-base leading-relaxed wp-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </article>
      {footerBlock && <Footer blocks={footerBlock} />}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const slugPath = slug.join("/");
  const uri = locale === "it" ? `/${slugPath}/` : `/${locale}/${slugPath}/`;

  let seo = await getSeo(uri, locale);
  if (!seo && locale !== "it") {
    seo = await getSeo(`/${slugPath}/`, locale);
  }

  const ogImages = seo?.featuredImage
    ? [{ url: seo.featuredImage.url, alt: seo.featuredImage.alt, width: seo.featuredImage.width, height: seo.featuredImage.height }]
    : [];

  return {
    title: seo?.title || "",
    description: seo?.description || "",
    robots: seo?.robots || "",
    canonical: seo?.canonicalUrl || "",
    openGraph: {
      locale: seo?.openGraph?.locale || "",
      siteName: seo?.openGraph?.siteName || "",
      type: seo?.openGraph?.type || "",
      title: seo?.openGraph?.title || "",
      description: seo?.openGraph?.description || "",
      url: seo?.openGraph?.url || "",
      images: ogImages,
    },
    twitter: {
      card: seo?.openGraph?.twitterMeta?.card || "summary_large_image",
      title: seo?.openGraph?.twitterMeta?.title || "",
      description: seo?.openGraph?.twitterMeta?.description || "",
      images: ogImages.map((i) => i.url),
    },
  };
}
