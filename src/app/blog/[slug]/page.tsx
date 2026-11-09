import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts, sortedPosts } from "@/data/posts";
import { getProducts } from "@/data/products";
import { site } from "@/lib/site";
import { articleLd, faqLd, graph, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    ownOgImage: true,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const products = getProducts(post.relatedProducts);
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs
          items={[
            { name: "Learn", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
      </div>

      <article className="wrap grid gap-12 pt-8 pb-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          <header className="max-w-[68ch]">
            <p className="text-sm font-semibold text-ghee-800">{post.category}</p>
            <h1 className="mt-2 font-display text-4xl leading-[1.05] sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-xl text-ink-800">{post.description}</p>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-700">
              <span>
                By{" "}
                <Link href="/about" className="font-semibold text-ink-900 underline underline-offset-4">
                  {site.name} dairy team
                </Link>
              </span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </header>

          <Image src={post.cover} alt="" width={1200} height={630} preload className="mt-8 aspect-[1200/630] w-full max-w-3xl rounded-3xl object-cover" />

          <div className="mt-10 max-w-[68ch] space-y-8">
            <QuickAnswer>{post.quickAnswer}</QuickAnswer>

            <section aria-labelledby="takeaways" className="rounded-2xl border border-line p-6">
              <h2 id="takeaways" className="text-lg font-semibold">
                Key takeaways
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {post.keyTakeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="prose-ghee mt-4">
            {post.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="scroll-mt-28">
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.list ? (
                  s.list.ordered ? (
                    <ol>
                      {s.list.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {s.list.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  )
                ) : null}
                {s.table ? (
                  <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-line" style={{ maxWidth: "none" }}>
                    <table className="table-ghee min-w-[32rem] text-base">
                      <caption className="px-4 pt-4">{s.table.caption}</caption>
                      <thead>
                        <tr>
                          {s.table.head.map((h, i) => (
                            <th key={i} scope="col">
                              {h || <span className="sr-only">Attribute</span>}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row">
                                  {cell}
                                </th>
                              ) : (
                                <td key={i}>{cell}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {s.after?.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
            ))}

            <section aria-labelledby="post-faq">
              <h2 id="post-faq">Frequently asked questions</h2>
              <div className="not-prose">
                <Faq items={post.faqs} />
              </div>
            </section>

            <section aria-labelledby="sources">
              <h2 id="sources">Sources</h2>
              <ol>
                {post.sources.map((s) => (
                  <li key={s.href + s.label}>
                    <a href={s.href} rel="noopener" target="_blank">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24 space-y-6">
            <div>
              <p className="font-semibold">On this page</p>
              <ol className="mt-3 space-y-2 border-l-2 border-line text-sm">
                {post.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-0.5 block border-l-2 border-transparent pl-3 text-ink-700 hover:border-ink-900 hover:text-ink-900">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#post-faq" className="-ml-0.5 block border-l-2 border-transparent pl-3 text-ink-700 hover:border-ink-900 hover:text-ink-900">
                    Questions
                  </a>
                </li>
              </ol>
            </div>
            {products[0] ? (
              <Link href={`/products/${products[0].slug}`} className="block rounded-2xl bg-oat p-5 hover:bg-ghee-100">
                <Image src={products[0].images[0].src} alt="" width={240} height={240} className="w-full rounded-xl" />
                <p className="mt-3 font-semibold">{products[0].name}</p>
                <p className="text-sm text-ink-700">{products[0].tagline}</p>
              </Link>
            ) : null}
          </nav>
        </aside>
      </article>

      {products.length ? (
        <section className="border-t border-line bg-oat py-16" aria-labelledby="post-products">
          <div className="wrap">
            <h2 id="post-products" className="font-display text-3xl sm:text-4xl">
              Ghee mentioned in this guide
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="wrap py-16" aria-labelledby="more-guides">
        <h2 id="more-guides" className="font-display text-3xl">
          More guides
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug} className="border-t-2 border-ink-900 pt-4">
              <p className="text-sm text-ghee-800">{p.category}</p>
              <Link href={`/blog/${p.slug}`} className="mt-1 block text-lg leading-snug font-semibold hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={graph(articleLd(post), faqLd(post.faqs))} />
    </>
  );
}
