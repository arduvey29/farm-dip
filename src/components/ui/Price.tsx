import { formatPrice, percentOff } from "@/lib/format";

export function Price({ price, mrp, size = "md", prefix }: { price: number; mrp?: number; size?: "md" | "lg"; prefix?: string }) {
  const off = mrp ? percentOff(price, mrp) : 0;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span className={size === "lg" ? "text-3xl font-bold" : "text-lg font-bold"}>
        {prefix ? <span className="mr-1 text-sm font-medium text-kattha-700">{prefix}</span> : null}
        {formatPrice(price)}
      </span>
      {off > 0 && mrp ? (
        <>
          <s className="text-sm text-kattha-500" aria-label={`MRP ${formatPrice(mrp)}`}>
            {formatPrice(mrp)}
          </s>
          <span className="text-sm font-semibold text-rani">{off}% off</span>
        </>
      ) : null}
    </span>
  );
}
