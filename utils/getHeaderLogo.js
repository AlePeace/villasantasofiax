import { fetchGraphQL } from "./fetchGraphQL";

export const getHeaderLogo = async () => {
  const query = `
    query HeaderLogo {
      mediaItem(id: 55, idType: DATABASE_ID) {
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
