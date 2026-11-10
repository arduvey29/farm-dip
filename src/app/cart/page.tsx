import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = pageMetadata({
  title: "Shopping Cart | Review Your Order",
  description: "Review your selected pure desi buffalo ghee jars, calculate shipping, and proceed to checkout with free cash on delivery across India.",
  path: "/cart",
  noindex: true,
});

export default function CartPage() {
  return (
    <section className="wrap py-10 lg:py-14">
      <h1 className="mb-8 font-display text-5xl">Your cart</h1>
      <CartView />
    </section>
  );
}
