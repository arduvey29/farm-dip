"use client";

import { useState } from "react";

/** PLACEHOLDER: wire `onSubmit` to your email provider (Klaviyo, Mailchimp, Brevo) via a server action. */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const dark = tone === "dark";

  if (status === "done") {
    return (
      <p role="status" className={`rounded-2xl px-5 py-4 font-semibold ${dark ? "bg-lal-800 text-chandan" : "bg-chandan"}`}>
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
        className={`min-h-12 flex-1 rounded-full border px-5 ${dark ? "border-kattha-700 bg-lal-950 text-chandan placeholder:text-kattha-500" : "border-kattha-200 bg-white"}`}
      />
      <button type="submit" className="min-h-12 rounded-full bg-haldi-500 px-6 font-semibold text-kattha-950 hover:bg-haldi-400">
        Subscribe
      </button>
    </form>
  );
}
