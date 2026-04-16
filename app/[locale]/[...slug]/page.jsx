import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { getFooter } from "utils/getFooter";
import { getSeo } from "utils/getSeo";
import { Footer } from "components/Footer";
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

  if (!data) {
    notFound();
  }

  const { blocks, content, title } = data;

  // Pagine con blocchi Gutenberg personalizzati riconoscibili dal BlockRenderer
  const hasKnownBlocks = blocks?.some((b) => b.name === "core/group");

  if (hasKnownBlocks) {
    return (
      <div className={`page-${slug[0]}`}>
        <BlockRenderer blocks={blocks} />
      </div>
    );
  }

  // Fallback per pagine con contenuto classico/shortcode (es. cookie-policy, privacy-policy)
  const footerBlock = await getFooter();

  return (
    <div className={`page-${slug[0]}`}>
      <article className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        {title && (
          <h1 className="font-montecatini text-blue text-3xl lg:text-5xl mb-10">
            {title}
          </h1>
        )}
        {content ? (
          <div
            className="font-nunito text-blue/80 text-base leading-relaxed wp-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}
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
    },
    twitter: {
      card: seo?.openGraph?.twitterMeta?.card || "",
      title: seo?.openGraph?.twitterMeta?.title || "",
      description: seo?.openGraph?.twitterMeta?.description || "",
    },
  };
}
