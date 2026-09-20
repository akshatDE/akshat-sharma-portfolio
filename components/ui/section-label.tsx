import { cn } from "@/lib/utils";

/**
 * Monospace eyebrow used above every major section.
 * The leading rule is what visually anchors sections to the left margin.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
        {children}
      </span>
    </div>
  );
}
