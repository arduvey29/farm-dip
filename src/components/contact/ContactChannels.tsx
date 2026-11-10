"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function ContactChannels() {
  const { contact } = site;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {/* WhatsApp Line Item */}
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between py-3 transition-colors hover:text-pasture-800"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-pasture-900 text-ghee-300">
            <Icon name="whatsapp" className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-ink-950 group-hover:text-pasture-800">
                WhatsApp us
              </span>
              <span className="rounded-full bg-pasture-100 px-1.5 py-0.2 text-[0.6rem] font-semibold text-pasture-900">
                Fastest
              </span>
            </div>
            <p className="text-xs text-ink-500">{contact.phone} • Instant replies</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-ink-600 group-hover:text-pasture-800">
          <span>Chat</span>
          <Icon name="arrowRight" className="size-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </a>

      {/* Direct Phone Line Item */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-oat text-ink-800">
            <Icon name="phone" className="size-3.5" />
          </div>
          <div>
            <span className="block text-[0.65rem] font-medium text-ink-500 uppercase tracking-wider">
              Direct Phone
            </span>
            <a
              href={`tel:${contact.phoneHref}`}
              className="text-sm font-medium text-ink-950 hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(contact.phone, "phone")}
          className="rounded-md px-2 py-1 text-xs text-ink-500 hover:bg-oat hover:text-ink-950 transition-colors"
          title="Copy phone"
        >
          {copiedKey === "phone" ? (
            <span className="font-semibold text-pasture-700">Copied</span>
          ) : (
            <span>Copy</span>
          )}
        </button>
      </div>

      {/* Direct Email Line Item */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-oat text-ink-800">
            <Icon name="mail" className="size-3.5" />
          </div>
          <div>
            <span className="block text-[0.65rem] font-medium text-ink-500 uppercase tracking-wider">
              Direct Email
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm font-medium text-ink-950 hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(contact.email, "email")}
          className="rounded-md px-2 py-1 text-xs text-ink-500 hover:bg-oat hover:text-ink-950 transition-colors"
          title="Copy email"
        >
          {copiedKey === "email" ? (
            <span className="font-semibold text-pasture-700">Copied</span>
          ) : (
            <span>Copy</span>
          )}
        </button>
      </div>
    </div>
  );
}
