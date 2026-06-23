import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { fetchGraphQL } from "./fetchGraphQL";

export const getPost = async (uri, locale = "it") => {
  console.log(`[getPost] Fetching URI: "${uri}", locale: "${locale}"`);

  const params = {
    query: `
      query PostQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Post {
            id
            title
            date
            blocks(postTemplate: false)
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            language {
              code
            }
            translations {
              id
              title
              uri
              blocks(postTemplate: false)
              language {
                code
              }
            }
          }
        }
      }
    `,
    variables: { uri },
  };

  const { data, errors } = await fetchGraphQL(params, { cache: "no-store" });

  if (errors) {
    console.error("[getPost] GraphQL errors:", JSON.stringify(errors, null, 2));
  }

  if (!data?.nodeByUri) {
    console.log(`[getPost] Post not found at URI: "${uri}"`);
    return null;
  }

  const post = data.nodeByUri;
  const postLanguage = post.language?.code?.toLowerCase();

  // Post già nella lingua richiesta
  if (postLanguage === locale) {
    return {
      title: post.title,
      date: post.date,
      featuredImage: post.featuredImage?.node || null,
      blocks: cleanAndTransformBlocks(post.blocks),
    };
  }

  // Cerca la traduzione nella lingua richiesta
  const translation = post.translations?.find(
    (t) => t.language?.code?.toLowerCase() === locale,
  );

  if (translation) {
    return {
      title: translation.title,
      date: post.date,
      featuredImage: post.featuredImage?.node || null,
      blocks: cleanAndTransformBlocks(translation.blocks),
    };
  }

  // Fallback: lingua originale
  return {
    title: post.title,
    date: post.date,
    featuredImage: post.featuredImage?.node || null,
    blocks: cleanAndTransformBlocks(post.blocks),
  };
};
