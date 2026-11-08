"use client";

import { useState } from "react";

/** PLACEHOLDER: wire `onSubmit` to your email provider (Klaviyo, Mailchimp, Brevo) via a server action. */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const dark = tone === "dark";

  if (status === "done") {
    return (
      <p role="status" className={`rounded-2xl px-5 py-4 font-semibold ${dark ? "bg-pasture-800 text-oat" : "bg-oat"}`}>
        Subscribed. Look out for our next note in your inbox.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("done");
      }}
    >
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`nl-${tone}`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className={`min-h-12 flex-1 rounded-full border px-5 ${dark ? "border-ink-700 bg-pasture-950 text-oat placeholder:text-ink-500" : "border-ink-200 bg-white"}`}
      />
      <button type="submit" className="btn btn-gold">
        Subscribe
      </button>
    </form>
  );
}
