import Link from "next/link";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { CartButton } from "@/components/cart/CartButton";
import { Icon } from "@/components/ui/Icon";
import { DiyaIcon } from "@/components/ui/Ornament";

export function Header() {
  const { festive } = site;
  return (
    <>
      <div className="bg-kumkum text-chandan">
        <div className="wrap flex min-h-9 items-center justify-between gap-4 py-1.5 text-[0.8125rem]">
          {festive ? (
            <Link href={festive.href} className="flex items-center gap-2 hover:underline">
              <DiyaIcon className="size-5 shrink-0" />
              <span>
                <span lang="hi" className="font-display font-semibold text-haldi-300">
                  {festive.hindi}!
                </span>{" "}
                {festive.text}. <span className="hidden sm:inline">{site.announcement}</span>
              </span>
            </Link>
          ) : (
            <p className="flex items-center gap-2">
              <Icon name="cash" className="size-4 shrink-0 text-haldi-300" />
              {site.announcement}
            </p>
          )}
          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Link href="/track-order" className="underline-offset-4 hover:underline">
              Track your order
            </Link>
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline" rel="noopener">
              <Icon name="whatsapp" className="size-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b-4 border-double border-peetal bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/90">
        <div className="wrap flex h-16 items-center gap-3 lg:h-[4.75rem]">
          <MobileMenu />
          <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                "children" in item ? (
                  <li key={item.href} className="group relative">
                    <Link href={item.href} className="inline-flex items-center gap-1 rounded-full px-4 py-2 font-semibold text-maroon-800 hover:bg-chandan">
                      {item.label}
                      <Icon name="chevronDown" className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="frame-peetal w-80 rounded-xl bg-paper p-3 shadow-[0_18px_40px_-20px_rgb(74_20_16/0.45)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block rounded-lg px-4 py-3 hover:bg-chandan">
                              <span className="block font-semibold text-maroon-800">{child.label}</span>
                              <span className="block text-sm text-maroon-700">{child.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex rounded-full px-4 py-2 font-semibold text-maroon-800 hover:bg-chandan">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/search" className="hidden rounded-full p-2.5 hover:bg-chandan sm:inline-flex" aria-label="Search">
              <Icon name="search" className="size-6" />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>
    </>
  );
}
