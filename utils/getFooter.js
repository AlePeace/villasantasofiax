import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

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

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  const { data } = await response.json();

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
