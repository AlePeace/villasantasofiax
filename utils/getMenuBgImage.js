import { fetchGraphQL } from "./fetchGraphQL";

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

  const json = await fetchGraphQL({ query }, { next: { revalidate: 86400 } });
  return json?.data?.mediaItem || null;
};
