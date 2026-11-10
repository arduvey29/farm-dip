import Link from "next/link";
import { site } from "@/lib/site";
import { mainProduct } from "@/data/products";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { HeaderNav } from "./HeaderNav";
import { CartButton } from "@/components/cart/CartButton";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  return (
    <>
      <div className="bg-ink-900 text-cream">
        <div className="wrap flex min-h-9 items-center justify-between gap-4 py-1.5 text-[0.8125rem]">
          <p className="flex items-center gap-2">
            <Icon name="cash" className="size-4 shrink-0 text-ghee-300" />
            {site.announcement}
          </p>
          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Link href="/track-order" className="underline-offset-4 hover:underline">
              Track your order
            </Link>
            <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
              <Icon name="whatsapp" className="size-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="wrap flex h-16 items-center gap-3 lg:h-[4.5rem]">
          <MobileMenu />
          <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
            <Logo />
          </div>

          <HeaderNav />

          <div className="flex items-center gap-1">
            <Link href="/search" className="hidden rounded-full p-2.5 hover:bg-oat sm:inline-flex" aria-label="Search">
              <Icon name="search" className="size-6" />
            </Link>
            <CartButton />
            <Link href={`/products/${mainProduct.slug}`} className="btn btn-ink ml-2 hidden min-h-11 px-5 lg:inline-flex">
              Shop ghee
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
