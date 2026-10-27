import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPolicy, policies } from "@/data/policies";
import { formatDate } from "@/lib/format";
import { graph, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return pageMetadata({ title: policy.title, description: policy.description, path: `/policies/${slug}` });
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: policy.title, path: `/policies/${slug}` }]} />
      </div>
      <section className="wrap grid gap-12 pt-8 pb-20 lg:grid-cols-[1fr_16rem]">
        <article className="prose-ghee">
          <h1 className="font-display text-5xl leading-[1.05]">{policy.title}</h1>
          <p className="text-maroon-700">
            Last updated <time dateTime={policy.updated}>{formatDate(policy.updated)}</time>
          </p>
          <p className="text-xl">{policy.description}</p>
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </article>
        <nav aria-label="Policies" className="lg:pt-4">
          <p className="font-semibold">Policies</p>
          <ul className="mt-3 space-y-2">
            {policies.map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} aria-current={p.slug === slug ? "page" : undefined} className="text-maroon-800 underline-offset-4 hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-maroon-900">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <JsonLd data={graph(webPageLd({ path: `/policies/${slug}`, name: policy.title, description: policy.description, dateModified: policy.updated }))} />
    </>
  );
}
