import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPageStaticProps = async (context) => {
  console.log("CONTEXT: ", context);
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  console.log("URI BEING QUERIED: ", uri);

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
            seo {
              title
              fullHead
            }
          }
        }
        menus {
          nodes {
            menuItems {
              nodes {
                uri
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  if (!data || !data.nodeByUri) {
    console.log("Page not found for URI:", uri);
    return {
      notFound: true,
    };
  }

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  console.log("BLOCK FROM CLEAN AND BLOCK TRANSFORM BLOCKS ---------", blocks);
  return {
    props: {
      seo: data.nodeByUri.seo,
      blocks,
      menus: data.menus.nodes,
    },
  };
};
