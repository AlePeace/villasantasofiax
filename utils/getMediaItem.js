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

  const res = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    //cache: "no-store",
    next: { revalidate: 86400 },
  });

  const json = await res.json();
  console.log(
    `[getMediaItem] id=${id}`,
    JSON.stringify(json?.data ?? json?.errors),
  );
  return json?.data?.mediaItem || null;
};
