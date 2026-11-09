import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { sortedPosts } from "@/data/posts";
import { graph, itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";

const title = "Learn About Ghee: Buffalo Ghee, Purity, Cooking and Storage Guides";
const description = "Plain-language guides to ghee: buffalo ghee vs cow ghee, how to test purity at home, smoke point and cooking, and how to store ghee.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" });

export default function BlogIndex() {
  const [lead, ...rest] = sortedPosts;
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Learn", path: "/blog" }]} />
      </div>
      <section className="wrap pt-8 pb-20">
        <h1 className="font-display text-5xl sm:text-6xl">Know your ghee</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-800">Straight answers about how ghee is made, what labels mean and how to tell good ghee from bad. No health claims we cannot back up.</p>

        <article className="group mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Link href={`/blog/${lead.slug}`} tabIndex={-1} aria-hidden>
            <Image src={lead.cover} alt="" width={1200} height={630} preload className="aspect-[1200/630] w-full rounded-3xl object-cover" />
          </Link>
          <div>
            <p className="text-sm text-ghee-800">{lead.category}</p>
            <h2 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">
              <Link href={`/blog/${lead.slug}`} className="underline-offset-4 group-hover:underline">
                {lead.title}
              </Link>
            </h2>
            <p className="mt-3 text-lg text-ink-800">{lead.description}</p>
            <p className="mt-3 text-sm text-ink-700">
              {lead.readingMinutes} min read
            </p>
          </div>
        </article>

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden>
                  <Image src={post.cover} alt="" width={1200} height={630} className="aspect-[1200/630] w-full rounded-2xl object-cover" />
                </Link>
                <p className="mt-4 text-sm text-ghee-800">{post.category}</p>
                <h2 className="mt-1 text-xl leading-snug font-semibold">
                  <Link href={`/blog/${post.slug}`} className="underline-offset-4 group-hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-ink-700">{post.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd
        data={graph(
          webPageLd({ path: "/blog", name: title, description, type: "CollectionPage" }),
          itemListLd(
            "Ghee guides",
            "/blog",
            sortedPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, image: p.cover })),
          ),
        )}
      />
    </>
  );
}
