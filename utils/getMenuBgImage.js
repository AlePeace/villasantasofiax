const MENU_BG_IMAGE_ID = 31; // ← metti qui il tuo ID

export const getMenuBgImage = async () => {
  if (!MENU_BG_IMAGE_ID) return null;

  const query = `
    query MenuBgImage {
      mediaItem(id: ${MENU_BG_IMAGE_ID}, idType: DATABASE_ID) {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  `;

  const res = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const json = await res.json();
  return json?.data?.mediaItem || null;
};
