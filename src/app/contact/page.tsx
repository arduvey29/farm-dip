import type { Metadata } from "next";
import { site } from "@/lib/site";
import { graph, ids, pageMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactForm } from "@/components/forms/ContactForm";

const title = `Contact ${site.name}: WhatsApp, Phone and Email`;
const description = `Talk to ${site.name} about orders, bulk gifting or our ghee. WhatsApp or call ${site.contact.phone}, ${site.contact.hours}. Based in ${site.address.locality}, ${site.address.region}.`;

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const { contact, address, legal } = site;
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Contact us", path: "/contact" }]} />
      </div>
      <section className="wrap grid gap-12 pt-8 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">Talk to us</h1>
          <p className="mt-4 text-lg text-kattha-800">WhatsApp is fastest. A real person from our team replies, {contact.hours}.</p>

          <ul className="mt-8 space-y-5">
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} rel="noopener" className="flex items-center gap-4 rounded-2xl bg-hara px-5 py-4 font-semibold text-chandan hover:opacity-90">
                <Icon name="whatsapp" className="size-7" />
                <span>
                  WhatsApp us
                  <span className="block text-sm font-normal opacity-90">{contact.phone}</span>
                </span>
              </a>
            </li>
            <li className="flex gap-4">
              <Icon name="phone" className="mt-1 size-6 shrink-0 text-haldi-700" />
              <span>
                <span className="block font-semibold">Call</span>
                <a href={`tel:${contact.phoneHref}`} className="underline underline-offset-4">
                  {contact.phone}
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Icon name="mail" className="mt-1 size-6 shrink-0 text-haldi-700" />
              <span>
                <span className="block font-semibold">Email</span>
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Icon name="pin" className="mt-1 size-6 shrink-0 text-haldi-700" />
              <address className="not-italic">
                <span className="block font-semibold">{site.legalName}</span>
                {address.street}, {address.locality}, {address.region} {address.postalCode}, {address.countryName}
              </address>
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-line p-5 text-sm">
            <p className="font-semibold">Grievance officer</p>
            <p className="mt-1 text-kattha-800">
              {legal.grievanceOfficer.name},{" "}
              <a href={`mailto:${legal.grievanceOfficer.email}`} className="underline underline-offset-4">
                {legal.grievanceOfficer.email}
              </a>
              . Complaints are acknowledged within 48 hours.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-line p-6 sm:p-8">
          <h2 className="mb-6 font-display text-3xl">Send a message</h2>
          <ContactForm />
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
