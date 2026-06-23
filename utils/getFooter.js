import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { fetchGraphQL } from "./fetchGraphQL";

// Recupera il blocco Footer dalla homepage per riusarlo negli articoli
export const getFooter = async () => {
  const params = {
    query: `
      query FooterQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            blocks(postTemplate: false)
          }
        }
      }
    `,
  };

  const { data } = await fetchGraphQL(params, { next: { revalidate: 86400 } });

  const blocks = cleanAndTransformBlocks(data?.nodeByUri?.blocks || []);

  return (
    blocks.find(
      (b) =>
        b.name === "core/group" &&
        (b.attributes?.metadata?.name === "Footer" ||
          b.attributes?.className?.includes("Footer")),
    ) || null
  );
};
