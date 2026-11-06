import Link from "next/link";
import type { Metadata } from "next";
import { faqGroups } from "@/data/faqs";
import { site } from "@/lib/site";
import { faqLd, graph, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";

const title = "Ghee Questions and Answers: Pure Buffalo Ghee, Bilona, Delivery and Returns";
const description = "Answers about pure buffalo ghee, bilona process, purity testing, delivery times, cash on delivery, returns and how to store ghee.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Questions and answers", path: "/faq" }]} />
      </div>
      <section className="wrap grid gap-12 pt-8 pb-20 lg:grid-cols-[16rem_1fr]">
        <div>
          <h1 className="font-display text-5xl leading-[1.02]">Questions and answers</h1>
          <nav aria-label="FAQ topics" className="mt-8 lg:sticky lg:top-24">
            <ul className="space-y-2">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="font-medium text-maroon-800 underline-offset-4 hover:underline">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-maroon-700">
              Still need help?{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-4">
                Contact us
              </Link>{" "}
              or WhatsApp {site.contact.phone}.
            </p>
          </nav>
        </div>
        <div className="space-y-14">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
              <h2 id={`${g.id}-title`} className="mb-4 font-display text-3xl">
                {g.title}
              </h2>
              <Faq items={g.items} name={g.id} />
            </section>
          ))}
        </div>
      </section>
      <JsonLd data={graph(faqLd(all))} />
    </>
  );
}
