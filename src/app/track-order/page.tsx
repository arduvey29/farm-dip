import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrackOrderForm } from "@/components/forms/TrackOrderForm";

export const metadata: Metadata = pageMetadata({
  title: "Track Your Order",
  description: `Track your ${site.name} ghee order with your order number and mobile number.`,
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <>
      <div className="wrap pt-5">
        <Breadcrumbs items={[{ name: "Track your order", path: "/track-order" }]} />
      </div>
      <section className="wrap grid gap-10 pt-8 pb-20 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl leading-[1.02]">Track your order</h1>
          <p className="mt-4 text-lg text-ink-800">
            Enter the order number from your confirmation SMS or email. Orders ship within {site.commerce.dispatchHours} hours and usually arrive in {site.commerce.transitDays.min} to {site.commerce.transitDays.max} days.
          </p>
        </div>
        <TrackOrderForm />
      </section>
    </>
  );
}
