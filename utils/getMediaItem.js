import { fetchGraphQL } from "./fetchGraphQL";

export const getMediaItem = async (id) => {
  if (!id) return null;

  const query = `
    query MediaItem {
      mediaItem(id: ${Number(id)}, idType: DATABASE_ID) {
        sourceUrl
        mediaItemUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  `;

  const json = await fetchGraphQL({ query }, { next: { revalidate: 86400 } });
  console.log(
    `[getMediaItem] id=${id}`,
    JSON.stringify(json?.data ?? json?.errors),
  );
  return json?.data?.mediaItem || null;
};
