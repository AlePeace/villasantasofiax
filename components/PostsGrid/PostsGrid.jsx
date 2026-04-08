import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getPosts } from "utils/getPosts";

export const PostsGrid = async () => {
  const locale = await getLocale();
  const posts = await getPosts(locale);

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
    <section className="pb-20 px-5 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts.map((post) => {
            const image = post.featuredImage?.node;
            const truncate = (text, limit = 90) => {
              const plain = text.replace(/<[^>]+>/g, "").trim();
              if (plain.length <= limit) return plain;
              return plain.slice(0, limit).trim() + "…";
            };
            const slug =
              post.uri?.split("/").filter(Boolean).pop() || post.slug;
            return (
              <Link
                key={post.id || post.slug}
                href={`${basePath}/${slug}`}
                className="group block"
              >
                <article className="bg-white shadow-2xl rounded-2xl overflow-hidden h-full flex flex-col">
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
                    {post.categories?.nodes?.map((cat) => (
                      <span key={cat.id} className="py-2 font-nunito text-orangelogo text-[11px] uppercase">{cat.name}</span>
                    ))}
                    <h2 className="font-montecatini text-blue text-xl mb-3 group-hover:text-blue/70 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-nunito text-text text-sm leading-relaxed flex-1">
                        {truncate(post.excerpt)}
                      </p>
                    )}
                    <span className="mt-4 font-nunito text-orangelogo uppercase text-xs font-semibold tracking-[2.4px]">
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
