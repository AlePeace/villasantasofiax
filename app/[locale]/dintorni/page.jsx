import { BlockRenderer } from "components/BlockRenderer";
import { Footer } from "components/Footer";
import { PostsGrid } from "components/PostsGrid/PostsGrid";
import { getPage } from "utils/getPage";
import { getPosts } from "utils/getPosts";
import { getSeo } from "utils/getSeo";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function DintorniPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const uri = locale === "it" ? "/dintorni/" : `/en/dintorni/`;

  const [pageBlocks, posts] = await Promise.all([
    getPage(uri, locale),
    getPosts(locale),
  ]);

  if (!pageBlocks) {
    notFound();
  }

  // Separa il Footer dagli altri blocchi così la griglia articoli
  // viene iniettata prima del footer e non dopo
  const footerBlock = pageBlocks.find(
    (b) =>
      b.name === "core/group" &&
      (b.attributes?.metadata?.name === "Footer" ||
        b.attributes?.className?.includes("Footer")),
  );
  const contentBlocks = pageBlocks.filter((b) => b !== footerBlock);

  return (
    <>
      {/* Blocchi gestiti da WordPress (HeroDintorni, ecc.) */}
      <BlockRenderer blocks={contentBlocks} />

      {/* Griglia articoli iniettata da Next.js */}
      <PostsGrid posts={posts} locale={locale} />

      {/* Footer sempre in fondo */}
      {footerBlock && <Footer blocks={footerBlock} />}
    </>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const uri = locale === "it" ? "/dintorni/" : `/en/dintorni/`;
  const seo = await getSeo(uri, locale);

  return {
    title: seo?.title || "Dintorni - Villa Santa Sofia",
    description: seo?.description || "Scopri i dintorni di Villa Santa Sofia nel Cilento",
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
  };
}
