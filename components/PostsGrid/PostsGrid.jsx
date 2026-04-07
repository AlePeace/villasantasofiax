import Image from "next/image";
import Link from "next/link";

export const PostsGrid = ({ posts = [], locale = "it" }) => {
  const basePath = locale === "it" ? "" : "/en";

  if (posts.length === 0) {
    return (
      <section className="py-20 px-5 lg:px-32">
        <p className="font-nunito text-blue/60 text-center py-20">
          Nessun articolo disponibile.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 px-5 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const image = post.featuredImage?.node;
            const slug =
              post.uri?.split("/").filter(Boolean).pop() || post.slug;
            return (
              <Link
                key={post.id || post.slug}
                href={`${basePath}/${slug}`}
                className="group block"
              >
                <article className="bg-peach rounded-2xl overflow-hidden h-full flex flex-col">
                  {image?.sourceUrl && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.sourceUrl}
                        alt={image.altText || post.title}
                        width={image.mediaDetails?.width || 800}
                        height={image.mediaDetails?.height || 600}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-montecatini text-blue text-xl mb-3 group-hover:text-blue/70 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <div
                        className="font-nunito text-blue/60 text-sm leading-relaxed line-clamp-3 flex-1"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.replace(/<[^>]+>/g, ""),
                        }}
                      />
                    )}
                    <span className="mt-4 font-nunito text-blue text-sm font-semibold underline underline-offset-4">
                      {locale === "it" ? "Leggi l'articolo →" : "Read more →"}
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
