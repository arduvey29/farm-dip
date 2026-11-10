"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";

interface TopicOption {
  id: string;
  label: string;
  icon: IconName;
  hint: string;
}

const TOPICS: TopicOption[] = [
  { id: "order", label: "Existing Order", icon: "truck", hint: "Tracking, dispatch or delivery status" },
  { id: "purity", label: "Ghee & Purity", icon: "shield", hint: "Buffalo milk sourcing, bilona churn or lab tests" },
  { id: "bulk", label: "Bulk & Gifting", icon: "gift", hint: "Weddings, festive hampers or wholesale jars" },
  { id: "general", label: "General Query", icon: "mail", hint: "Storage advice, questions or feedback" },
];

export function CreativeContactForm() {
  const [topic, setTopic] = useState<string>("order");
  const [name, setName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endpoint = site.contact.formspreeEndpoint || "https://formspree.io/f/xqpqzzre";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const selectedTopic = TOPICS.find((t) => t.id === topic)?.label || topic;
    const isEmail = contactInfo.includes("@");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          contact: contactInfo.trim(),
          ...(isEmail
            ? { email: contactInfo.trim(), _replyto: contactInfo.trim() }
            : { phone: contactInfo.trim() }),
          topic: selectedTopic,
          orderNumber: orderNumber.trim() || undefined,
          message: message.trim(),
          _subject: `New Inquiry (${selectedTopic}) from ${name.trim() || "Customer"} - ${site.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        const errMsg =
          data?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          "Could not send your message. Please try again or chat with us on WhatsApp.";
        setErrorMessage(errMsg);
      }
    } catch {
      setErrorMessage("Network error. Please check your connection or send your inquiry via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const selectedTopic = TOPICS.find((t) => t.id === topic)?.label || topic;
    const textLines = [
      `Hello ${site.name} team!`,
      name ? `My name is ${name}.` : "",
      `Topic: ${selectedTopic}`,
      orderNumber ? `Order #: ${orderNumber}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean);

    const waUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(textLines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="animate-fade-in py-8 text-center sm:py-12">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-pasture-900 text-cream">
          <Icon name="check" className="size-5" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink-950 sm:text-2xl">
          Thank you{name ? `, ${name}` : ""}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-600">
          We have received your message. Our team in Rohtak will review it and reply within one working day.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setErrorMessage(null);
              setMessage("");
              setOrderNumber("");
            }}
            className="btn btn-ink min-h-10 rounded-full px-5 text-xs font-medium"
          >
            Send another message
          </button>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-xs font-medium text-ink-900 transition-colors hover:border-ink-900"
          >
            <Icon name="whatsapp" className="size-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  const selectedTopicObj = TOPICS.find((t) => t.id === topic);

  return (
    <form action={endpoint} method="POST" onSubmit={handleSubmit} className="space-y-5">
      {/* MINIMAL HORIZONTAL PILL SELECTOR */}
      <div>
        <label className="mb-2 block text-xs font-medium text-ink-600 uppercase tracking-wider">
          Topic
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const isSelected = topic === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-ink-950 text-cream shadow-xs"
                    : "border border-line/80 text-ink-700 hover:border-ink-900 hover:text-ink-950"
                }`}
              >
                <Icon
                  name={t.icon}
                  className={`size-3.5 ${isSelected ? "text-ghee-300" : "text-ink-400"}`}
                />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
        {selectedTopicObj && (
          <p className="mt-1.5 text-[0.72rem] text-ink-500">
            {selectedTopicObj.hint}
          </p>
        )}
      </div>

      {/* REFINED UNDERLINE INPUTS */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-ink-700">
            Your Name <span className="text-spice">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full border-b border-line bg-transparent py-2 text-sm text-ink-950 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-contactInfo" className="mb-1 block text-xs font-medium text-ink-700">
            Mobile or Email <span className="text-spice">*</span>
          </label>
          <input
            id="contact-contactInfo"
            name="contactInfo"
            type="text"
            required
            autoComplete="email tel"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="87690 45495 or name@email.com"
            className="w-full border-b border-line bg-transparent py-2 text-sm text-ink-950 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* OPTIONAL ORDER NUMBER */}
      {topic === "order" && (
        <div className="animate-fade-in">
          <label htmlFor="contact-orderNum" className="mb-1 block text-xs font-medium text-ink-700">
            Order Number <span className="text-[0.7rem] text-ink-400 font-normal">(Optional)</span>
          </label>
          <input
            id="contact-orderNum"
            name="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. FD-10482 or tracking ID"
            className="w-full border-b border-line bg-transparent py-2 text-sm text-ink-950 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* MESSAGE TEXTAREA */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="contact-message" className="text-xs font-medium text-ink-700">
            Your Message <span className="text-spice">*</span>
          </label>
          <span className="text-[0.68rem] text-ink-400">{message.length} chars</span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your order, query, or custom requirements..."
          className="w-full border-b border-line bg-transparent py-2 text-sm text-ink-950 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* ERROR NOTICE */}
      {errorMessage && (
        <div className="animate-fade-in rounded-lg border border-spice/20 bg-spice/5 p-3 text-xs text-spice">
          <p className="font-medium">{errorMessage}</p>
          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="mt-1.5 inline-flex items-center gap-1 font-semibold underline hover:opacity-80"
          >
            <Icon name="whatsapp" className="size-3.5" />
            <span>Send message via WhatsApp instead</span>
          </button>
        </div>
      )}

      {/* MINIMAL ACTION BUTTONS */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-ink min-h-10 rounded-full px-7 text-xs font-medium tracking-wide uppercase shadow-xs disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-3 animate-spin rounded-full border-2 border-cream border-t-transparent" />
              <span>Sending...</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span>Send message</span>
              <Icon name="arrowRight" className="size-3" />
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-pasture-800 hover:text-pasture-950 hover:underline"
        >
          <Icon name="whatsapp" className="size-3.5 text-pasture-700" />
          <span>Or send via WhatsApp</span>
        </button>
      </div>
    </form>
  );
}
