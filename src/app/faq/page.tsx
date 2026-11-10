import type { Metadata } from "next";
import { faqGroups } from "@/data/faqs";
import { site } from "@/lib/site";
import { faqLd, graph, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqRevamped } from "@/components/faq/FaqRevamped";

const title = "Frequently Asked Questions | Purity, Bilona Process & Delivery";
const description = `Clear, honest answers about ${site.name} pure desi buffalo ghee | Authentic bilona churning, nutrition, doorstep delivery across India, lab test verification, and refunds.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Questions and answers", path: "/faq" }]} />
      </div>

      <div className="wrap">
        <FaqRevamped faqGroups={faqGroups} />
      </div>

      <JsonLd data={graph(faqLd(all))} />
    </>
  );
}
