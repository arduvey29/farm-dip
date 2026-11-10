"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mainNav, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { LogoMark, Wordmark } from "./Logo";

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close after navigating.
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    ref.current?.close();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="-ml-2 rounded-full p-2.5 hover:bg-oat lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Icon name="menu" className="size-6" />
      </button>

      <dialog
        ref={ref}
        className="drawer drawer-left"
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2"
              aria-label={`${site.name} home`}
            >
              <LogoMark className="h-11 w-auto" />
              <Wordmark className="text-2xl" />
            </Link>
            <button type="button" onClick={() => ref.current?.close()} className="rounded-full p-2 hover:bg-oat" aria-label="Close menu">
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className="block rounded-xl px-3 py-3 text-lg font-medium hover:bg-oat"
                >
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => ref.current?.close()}
                    className="block rounded-xl px-3 py-3 text-lg font-medium hover:bg-oat"
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mb-2 ml-3 border-l-2 border-ghee-300 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => ref.current?.close()}
                            className="block rounded-lg px-3 py-2 text-ink-800 hover:bg-oat"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li>
                <Link
                  href="/search"
                  onClick={() => ref.current?.close()}
                  className="block rounded-xl px-3 py-3 text-lg font-medium hover:bg-oat"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  onClick={() => ref.current?.close()}
                  className="block rounded-xl px-3 py-3 text-lg font-medium hover:bg-oat"
                >
                  Track your order
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-line bg-oat px-5 py-4 text-sm">
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="flex items-center gap-2 font-semibold" rel="noopener">
              <Icon name="whatsapp" /> WhatsApp {site.contact.phone}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
