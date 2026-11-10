import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";
import { Icon } from "@/components/ui/Icon";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const { address, contact, legal } = site;
  return (
    <footer className="mt-auto bg-pasture-950 text-pasture-200">
      <div className="wrap grid gap-5 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-6 lg:py-6">
        {/* Brand & NAP block */}
        <div className="space-y-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2" aria-label={`${site.name} home`}>
            <LogoMark className="h-7 w-auto shrink-0 sm:h-8" />
            <Wordmark className="text-xl text-cream" />
          </Link>

          <address className="space-y-1 text-xs not-italic text-pasture-300">
            <p className="flex items-start gap-1.5">
              <Icon name="pin" className="mt-0.5 size-3.5 shrink-0 text-ghee-400" />
              <span>
                {site.legalName}, {address.street}, {address.locality}, {address.region} {address.postalCode}
              </span>
            </p>
            <p className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5">
              <a href={`tel:${contact.phoneHref}`} className="inline-flex items-center gap-1 hover:text-ghee-300 hover:underline">
                <Icon name="phone" className="size-3.5 shrink-0 text-ghee-400" />
                <span>{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1 hover:text-ghee-300 hover:underline">
                <Icon name="mail" className="size-3.5 shrink-0 text-ghee-400" />
                <span>{contact.email}</span>
              </a>
            </p>
          </address>
        </div>

        <FooterColumn title="Shop" links={footerNav.ghee} />
        <FooterColumn title="About" links={footerNav.story} />
        <FooterColumn title="Support" links={footerNav.support} />
        <FooterColumn title="Policies" links={footerNav.policies} />
      </div>

      <div className="border-t border-pasture-900 bg-pasture-950/80">
        <div className="wrap flex flex-col gap-1 py-2.5 text-[0.7rem] text-pasture-400 md:flex-row md:flex-wrap md:justify-between md:gap-x-6">
          <p>
            © {year} {site.legalName}. FSSAI Lic. No. {legal.fssai}. GSTIN {legal.gstin}.
          </p>
          <p>
            Grievance officer: {legal.grievanceOfficer.name},{" "}
            <a href={`mailto:${legal.grievanceOfficer.email}`} className="underline underline-offset-2 hover:text-pasture-200">
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
      <h2 className="font-display text-xs font-semibold tracking-wider text-cream uppercase">{title}</h2>
      <ul className="mt-1.5 space-y-1 text-xs">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-pasture-300 transition-colors hover:text-ghee-300 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
