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
    <footer className="relative mt-auto overflow-hidden bg-pasture-950 text-pasture-200">
      {/* Soft Faded Translucent Cream Watermark behind existing footer */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <span className="font-deva text-[9.5vw] font-black tracking-tight leading-none text-cream/[0.035] uppercase whitespace-nowrap">
          FARM DIP
        </span>
      </div>

      <div className="wrap grid grid-cols-2 gap-x-5 gap-y-6 py-6 sm:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-6 lg:py-6">
        {/* Brand & NAP block - spans full width on phone & tablet, 1.5fr on desktop */}
        <div className="col-span-2 space-y-2 sm:col-span-4 lg:col-span-1">
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

        {/* 2x2 Grid of Links on Mobile: Shop, About, Support, Policies */}
        <FooterColumn title="Shop" links={footerNav.ghee} />
        <FooterColumn title="About" links={footerNav.story} />
        <FooterColumn title="Support" links={footerNav.support} />
        <FooterColumn title="Policies" links={footerNav.policies} />
      </div>

      <div className="relative z-10 border-t border-pasture-900 bg-pasture-950/80">
        <div className="wrap grid gap-2 py-2.5 text-[0.7rem] text-pasture-400 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-6">
          <p className="sm:col-span-2 md:col-span-2 lg:col-span-4">
            © {year} {site.legalName}. FSSAI Lic. No. {legal.fssai}.
          </p>
          <p className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <a
              href="https://www.logixloops.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b82f6] transition-colors hover:text-[#60a5fa] hover:underline whitespace-nowrap"
            >
              Developed By logixloops.in
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
