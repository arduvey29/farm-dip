import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = pageMetadata({
  title: "Your cart",
  description: "Review the ghee in your cart, apply a coupon and check out with free cash on delivery.",
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
