import { fetchGraphQL } from "./fetchGraphQL";

export const getPosts = async (locale = "it") => {
  const params = {
    query: `
      query PostsQuery {
        posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            uri
            date
            excerpt(format: RENDERED)
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
            categories {
              nodes {
                id
                name
                slug
              }
            }
            language {
              code
            }
            translations {
              title
              slug
              uri
              excerpt(format: RENDERED)
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
            }
          }
        }
      }
    `,
  };

  const { data, errors } = await fetchGraphQL(params, { next: { revalidate: 86400 } });

  if (errors) {
    console.error(
      "[getPosts] GraphQL errors:",
      JSON.stringify(errors, null, 2),
    );
  }

  const nodes = data?.posts?.nodes || [];

  // Filtra e restituisce i post nella lingua richiesta
  return nodes
    .map((post) => {
      const postLang = post.language?.code?.toLowerCase();
      if (postLang === locale) return post;

      const translation = post.translations?.find(
        (t) => t.language?.code?.toLowerCase() === locale,
      );
      return translation || post;
    })
    .filter(Boolean);
};
