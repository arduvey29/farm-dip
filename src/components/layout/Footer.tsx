import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";
import { Icon } from "@/components/ui/Icon";
import { TestReport } from "@/components/ui/TestReport";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const { address, contact, legal } = site;
  return (
    <footer className="mt-auto bg-pasture-950 text-pasture-100">
      <div className="wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_auto] lg:gap-12 lg:py-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <LogoMark className="h-14 w-auto shrink-0" />
            <Wordmark className="text-3xl text-cream" />
          </Link>
          {/* NAP block: keep identical to Google Business Profile and structured data. */}
          <address className="space-y-1.5 text-sm not-italic">
            <p className="flex gap-2">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
              <span>
                {site.legalName}, {address.street}, {address.locality}, {address.region} {address.postalCode}
              </span>
            </p>
            <p className="flex flex-wrap gap-x-5 gap-y-1.5">
              <a href={`tel:${contact.phoneHref}`} className="inline-flex gap-2 hover:underline">
                <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="inline-flex gap-2 hover:underline">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
                {contact.email}
              </a>
            </p>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:col-span-2 lg:col-span-2 lg:gap-12">
          <FooterColumn title={site.name} links={footerNav.company} />
          <FooterColumn title="Help" links={footerNav.help} />
        </div>

        <TestReport className="self-start sm:col-span-2 sm:justify-self-start lg:col-span-1" />
      </div>

      <div className="border-t border-pasture-800">
        <div className="wrap flex flex-col gap-1.5 py-5 text-xs text-pasture-200 md:flex-row md:flex-wrap md:justify-between md:gap-x-6">
          <p>
            © {year} {site.legalName}. FSSAI Lic. No. {legal.fssai}. GSTIN {legal.gstin}.
          </p>
          <p>
            Grievance officer: {legal.grievanceOfficer.name},{" "}
            <a href={`mailto:${legal.grievanceOfficer.email}`} className="underline underline-offset-2">
              {legal.grievanceOfficer.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-base text-cream">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-ghee-300 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
