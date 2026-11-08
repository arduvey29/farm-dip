/**
 * Direct answer block placed before long content. Marked speakable for voice assistants
 * and written to be quoted as-is by featured snippets and AI overviews.
 */
export function QuickAnswer({ children, label = "Short answer" }: { children: React.ReactNode; label?: string }) {
  return (
    <aside data-speakable className="rounded-r-2xl border-l-4 border-ghee-500 bg-oat px-5 py-4 sm:px-6 sm:py-5">
      <p className="text-sm font-semibold text-ghee-800">{label}</p>
      <p className="mt-1 text-lg leading-relaxed">{children}</p>
    </aside>
  );
}
