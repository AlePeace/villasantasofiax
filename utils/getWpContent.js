// Recupera il contenuto HTML renderizzato via REST API di WordPress.
// Usato come fallback per pagine con blocchi custom (es. complianz/document)
// che non popolano il campo `content` in GraphQL.
export const getWpContent = async (slug, locale = "it") => {
  const lang = locale === "it" ? "" : `&lang=${locale}`;
  const url = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/pages?slug=${slug}${lang}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });
    const pages = await response.json();
    return pages?.[0]?.content?.rendered || null;
  } catch {
    return null;
  }
};
