import type { Metadata } from "next";
import { site } from "@/lib/site";
import { graph, ids, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { CreativeContactForm } from "@/components/contact/CreativeContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactLocationMap } from "@/components/contact/ContactLocationMap";

const title = "Contact Us | WhatsApp, Phone & Farm Support";
const description = `Talk directly with ${site.name} | WhatsApp & call on ${site.contact.phone}, or email ${site.contact.email}. Farm & dispatch based in ${site.address.locality}, ${site.address.region}.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <div className="wrap pt-3 sm:pt-4">
        <Breadcrumbs items={[{ name: "Contact us", path: "/contact" }]} />
      </div>

      {/* OPEN EDITORIAL CONTACT SPREAD */}
      <section className="wrap pt-3 pb-16 sm:pt-5 sm:pb-24">
        {/* Subtle Minimal Header */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-pasture-800">
            <span className="size-1.5 rounded-full bg-pasture-700" />
            <span>Customer Care & Farm Support</span>
            <span className="text-line">•</span>
            <span className="text-ink-500">Rohtak, Haryana</span>
          </div>

          <h1 className="mt-1.5 font-display text-3xl font-semibold leading-tight text-ink-950 sm:text-4xl lg:text-[2.6rem]">
            Talk to our team.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base">
            Whether you want to track a jar, inquire about our buffalo milk sourcing, or arrange custom bulk orders, a member of our team is ready to assist.
          </p>
        </div>

        {/* Dynamic 2-Column Spread: Left Directory + Map / Right Message Form (No boxy cards) */}
        <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:items-start">
          {/* Left Column: Direct Fast Channels + Compact Location Map */}
          <div className="space-y-5">
            <div>
              <h2 className="mb-2 text-xs font-semibold tracking-wider text-ink-600 uppercase">
                Direct Channels
              </h2>
              <ContactChannels />
            </div>

            <ContactLocationMap />
          </div>

          {/* Right Column: Open Stationery-Style Form (Zero boxy card) */}
          <div className="lg:border-l lg:border-line/70 lg:pl-12">
            <div className="mb-5">
              <h2 className="font-display text-2xl font-semibold text-ink-950">
                Send a message
              </h2>
              <p className="mt-0.5 text-xs text-ink-500">
                We read and respond within one working day.
              </p>
            </div>

            <CreativeContactForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={graph({
          ...webPageLd({ path: "/contact", name: title, description, type: "ContactPage" }),
          mainEntity: { "@id": ids.organization },
        })}
      />
    </>
  );
}
