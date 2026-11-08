"use client";

import { useState } from "react";

/** PLACEHOLDER: send to your helpdesk or email via a server action. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className="rounded-2xl bg-oat p-6 text-lg">
        Message sent. We reply within one working day, usually much sooner on WhatsApp.
      </p>
    );
  }

  const input = "min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4";
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold">
            Name
          </label>
          <input id="c-name" name="name" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold">
            Mobile or email
          </label>
          <input id="c-phone" name="contact" required autoComplete="email" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="c-topic" className="mb-1.5 block text-sm font-semibold">
          Topic
        </label>
        <select id="c-topic" name="topic" className={input} defaultValue="order">
          <option value="order">An existing order</option>
          <option value="product">Our ghee</option>
          <option value="bulk">Bulk or corporate gifting</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={5} className={`${input} py-3`} />
      </div>
      <button type="submit" className="min-h-12 rounded-full bg-pasture-900 px-7 font-semibold text-oat hover:bg-pasture-800">
        Send message
      </button>
    </form>
  );
}
