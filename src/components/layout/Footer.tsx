import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LogoMark } from "./Logo";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Mandala } from "@/components/ui/Ornament";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const { address, contact, legal } = site;
  return (
    <footer className="relative mt-auto overflow-hidden bg-maroon-900 text-maroon-100">
      <div className="kairi-band" aria-hidden />
      <Mandala className="pointer-events-none absolute -top-40 -right-40 size-[34rem] opacity-15" />

      <div className="wrap relative flex flex-col items-center gap-6 border-b border-maroon-800 py-12 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left">
        <LogoMark className="h-40 w-auto shrink-0" />
        <div>
          <p lang="sa" className="font-display text-4xl text-haldi-400 sm:text-5xl">
            आयुर्वै घृतम्
          </p>
          <p className="mt-2 max-w-md text-maroon-200">“Ghee, truly, is life.” An old Sanskrit saying, and the reason we make it slowly.</p>
        </div>
      </div>

      <div className="wrap relative grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <p className="font-display text-3xl text-chandan">
            <span lang="hi">फ़ार्म</span> dip
          </p>
          <p className="max-w-sm text-maroon-200">
            Pure Desi Ghee made from pure buffalo milk, crafted with care to bring authentic taste, rich aroma and wholesome goodness to your everyday meals.
          </p>
          {/* NAP block: keep identical to Google Business Profile and structured data. */}
          <address className="space-y-2 text-sm not-italic">
            <p className="flex gap-2">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-haldi-400" />
              <span>
                {site.legalName}
                <br />
                {address.street}, {address.locality}, {address.region} {address.postalCode}, {address.countryName}
              </span>
            </p>
            <p className="flex gap-2">
              <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-haldi-400" />
              <a href={`tel:${contact.phoneHref}`} className="hover:underline">
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-2">
              <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-haldi-400" />
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-2">
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-haldi-400" />
              {contact.hours}
            </p>
          </address>
        </div>

        <FooterColumn title="Shop" links={footerNav.shop} />
        <FooterColumn title={site.name} links={footerNav.company} />
        <FooterColumn title="Help" links={footerNav.help} />
      </div>

      <div className="relative border-t border-maroon-800">
        <div className="wrap grid gap-6 py-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h2 className="font-display text-2xl text-chandan">Ghee notes, once a month</h2>
            <p className="mt-1 text-maroon-200">New batches, festive offers and recipes. No spam; unsubscribe any time.</p>
          </div>
          <NewsletterForm tone="dark" />
        </div>
      </div>

      <div className="relative border-t border-maroon-800 bg-maroon-950">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-maroon-200 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. FSSAI Lic. No. {legal.fssai}. GSTIN {legal.gstin}.
          </p>
          <p>
            Grievance officer: {legal.grievanceOfficer.name},{" "}
            <a href={`mailto:${legal.grievanceOfficer.email}`} className="underline underline-offset-2">
              {legal.grievanceOfficer.email}
            </a>
          </p>
          <p>UPI, cards, net banking and cash on delivery</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-lg text-haldi-300">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-haldi-300 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
