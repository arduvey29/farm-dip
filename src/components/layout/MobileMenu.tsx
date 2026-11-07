"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mainNav, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "./Logo";

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close after navigating.
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="-ml-2 rounded-full p-2.5 hover:bg-chandan lg:hidden"
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
            <span className="inline-flex items-center gap-2 font-display text-xl">
              <LogoMark className="h-11 w-auto" />
              <span>
                <span lang="hi">फ़ार्म</span> dip
              </span>
            </span>
            <button type="button" onClick={() => ref.current?.close()} className="rounded-full p-2 hover:bg-chandan" aria-label="Close menu">
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-chandan">
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mb-2 ml-3 border-l-2 border-haldi-300 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block rounded-lg px-3 py-2 text-kattha-800 hover:bg-chandan">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li>
                <Link href="/search" className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-chandan">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-chandan">
                  Track your order
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-2 border-t border-line bg-chandan px-5 py-4 text-sm">
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="flex items-center gap-2 font-semibold" rel="noopener">
              <Icon name="whatsapp" /> WhatsApp {site.contact.phone}
            </a>
            <p className="text-kattha-700">{site.contact.hours}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
