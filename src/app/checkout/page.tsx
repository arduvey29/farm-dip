import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = pageMetadata({
  title: "Checkout",
  description: "Enter your delivery details and pay by UPI, card, net banking or free cash on delivery.",
  path: "/checkout",
  noindex: true,
});

export default function CheckoutPage() {
  return (
    <section className="wrap py-10 lg:py-14">
      <h1 className="mb-6 font-display text-4xl sm:text-5xl">Checkout</h1>
      <CheckoutForm />
    </section>
  );
}
