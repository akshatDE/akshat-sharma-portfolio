import type { ProjectStatus } from "@/lib/types";
import { projectStatusLabels } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Lifecycle marker for a project. Uses the "quality" tone — the same amber that
 * flags a data-quality gate in the diagrams — so in-progress reads as a caution
 * signal rather than decoration.
 */
export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-fg-muted",
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-[var(--tone-quality)]"
        aria-hidden="true"
      />
      {projectStatusLabels[status]}
    </span>
  );
}
