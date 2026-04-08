import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
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

  if (!data) {
    notFound();
  }

  return (
    <div className={`page-${slug[0]}`}>
      <BlockRenderer blocks={data} />
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
