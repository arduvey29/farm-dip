import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Logo";
import { MotionToggle } from "./MotionToggle";
import { Icon } from "@/components/ui/Icon";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const { address, contact, legal } = site;
  return (
    <footer className="relative mt-auto overflow-hidden bg-pasture-950 text-pasture-100">
      <div className="wrap relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <LogoMark className="h-20 w-auto shrink-0" />
            <Wordmark className="text-4xl text-cream" />
          </div>
          <p className="max-w-sm">
            Pure desi ghee from buffalo milk, made the way we ate it as children. No preservatives, no additives. Rich, creamy and full of aroma.
          </p>
          <p className="max-w-sm">
            <span lang="sa" className="font-deva text-2xl font-semibold text-ghee-300">
              आयुर्वै घृतम्
            </span>
            <span className="block text-sm text-pasture-200">“Ghee, truly, is life.” An old Sanskrit saying.</span>
          </p>
          {/* NAP block: keep identical to Google Business Profile and structured data. */}
          <address className="space-y-2 text-sm not-italic">
            <p className="flex gap-2">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
              <span>
                {site.legalName}
                <br />
                {address.street}, {address.locality}, {address.region} {address.postalCode}, {address.countryName}
              </span>
            </p>
            <p className="flex gap-2">
              <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
              <a href={`tel:${contact.phoneHref}`} className="hover:underline">
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-2">
              <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-2">
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-ghee-400" />
              {contact.hours}
            </p>
          </address>
        </div>

        <FooterColumn title="Shop" links={footerNav.shop} />
        <FooterColumn title={site.name} links={footerNav.company} />
        <FooterColumn title="Help" links={footerNav.help} />
      </div>

      <div className="relative border-t border-pasture-800">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-pasture-200 md:flex-row md:flex-wrap md:items-center md:justify-between">
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
          <MotionToggle className="text-pasture-100" />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-lg text-cream">{title}</h2>
      <ul className="mt-4 space-y-2.5">
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
