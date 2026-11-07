import type { ProcessStep } from "@/data/process";

/* Line drawings for each step of making ghee. Stroke uses currentColor so they sit on light or dark grounds. */
const drawings: Record<ProcessStep["icon"], React.ReactNode> = {
  cow: (
    <>
      <path d="M12 26c0-5 4-8 10-8h12c4 0 6 2 7 5l2 6" />
      <path d="M41 29l3-1c2 0 3 1 3 3v2c0 2-2 3-4 3h-2" />
      <path d="M14 26v12M20 30v8M32 30v8M38 30v8" />
      <path d="M41 22c1-3 3-4 5-4M46 22c2-1 3-3 3-5" />
      <path d="M22 18c2-3 5-4 8-3" />
    </>
  ),
  milk: (
    <>
      <path d="M18 10h12l2 6v24a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V16l2-6Z" />
      <path d="M16 22h16" />
      <path d="M22 30c0-2 2-4 2-4s2 2 2 4a2 2 0 0 1-4 0Z" />
    </>
  ),
  curd: (
    <>
      <path d="M10 22h28c0 10-6 18-14 18S10 32 10 22Z" />
      <path d="M8 22h32" />
      <path d="M16 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </>
  ),
  churn: (
    <>
      <path d="M24 4v26" />
      <path d="M18 30h12l-2 6h-8l-2-6Z" />
      <path d="M12 22c0 12 5 20 12 20s12-8 12-20" />
      <path d="M14 8h20M14 8c-2 0-3 2-1 3M34 8c2 0 3 2 1 3" />
    </>
  ),
  butter: (
    <>
      <path d="M8 34c4-6 8-8 16-8s12 2 16 8" />
      <path d="M8 34h32v4H8z" />
      <path d="M17 26c0-5 3-9 7-9s7 4 7 9" />
    </>
  ),
  fire: (
    <>
      <path d="M8 22h32c0 6-6 10-16 10S8 28 8 22Z" />
      <path d="M6 22h36" />
      <path d="M18 42c-2-3 0-6 2-7 0 2 1 3 2 3 0-3 1-6 4-8 0 3 2 5 3 7 1 2 0 4-1 5" />
      <path d="M12 42h24" />
    </>
  ),
  filter: (
    <>
      <path d="M10 10h28l-10 14v12l-8 4V24L10 10Z" />
      <path d="M24 42v2" />
    </>
  ),
  jar: (
    <>
      <path d="M16 6h16v6H16z" />
      <rect x="12" y="12" width="24" height="30" rx="5" />
      <path d="M12 22h24M12 32h24" />
      <path d="M21 27l2 2 4-4" />
    </>
  ),
};

export function ProcessIcon({ icon, className = "size-12" }: { icon: ProcessStep["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden focusable="false">
      {drawings[icon]}
    </svg>
  );
}
