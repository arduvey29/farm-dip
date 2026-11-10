"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function HeaderNav() {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/shop") {
      return pathname === "/shop" || pathname.startsWith("/products");
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
      <ul className="flex items-center gap-1">
        {mainNav.map((item) => {
          const active = isItemActive(item.href);

          return item.children ? (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                  active
                    ? "bg-oat font-semibold text-ink-950 shadow-xs"
                    : "text-ink-800 hover:bg-oat/70 hover:text-ink-950"
                }`}
              >
                <span>{item.label}</span>
                <Icon
                  name="chevronDown"
                  className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                />
                {active && (
                  <span
                    className="absolute -bottom-1.5 left-4 right-4 h-[2.5px] rounded-full bg-gradient-to-r from-ghee-300 via-ghee-500 to-ghee-300 shadow-[0_2px_8px_rgba(235,168,38,0.7)] animate-fade-in"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="w-80 rounded-2xl border border-line bg-milk p-3 shadow-[0_18px_40px_-20px_rgb(35_27_30/0.4)]">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="block rounded-xl px-4 py-3 hover:bg-oat">
                        <span className="block font-semibold text-ink-900">{child.label}</span>
                        <span className="block text-sm text-ink-700">{child.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative inline-flex items-center rounded-full px-4 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                  active
                    ? "bg-oat font-semibold text-ink-950 shadow-xs"
                    : "text-ink-800 hover:bg-oat/70 hover:text-ink-950"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span
                    className="absolute -bottom-1.5 left-4 right-4 h-[2.5px] rounded-full bg-gradient-to-r from-ghee-300 via-ghee-500 to-ghee-300 shadow-[0_2px_8px_rgba(235,168,38,0.7)] animate-fade-in"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
