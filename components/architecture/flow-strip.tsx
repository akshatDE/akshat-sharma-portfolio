import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Compact linear flow used outside case studies — the generic
 * "sources → ingestion → processing → storage → analytics" shape.
 *
 * Horizontal on wide screens, vertical below sm, so it never overflows.
 * Separators are list items too, because only <li> is valid inside <ol>.
 */
export function FlowStrip({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0",
        className,
      )}
    >
      {steps.map((step, index) => (
        <Fragment key={step}>
          <li className="rounded-lg border border-border bg-bg-inset px-3 py-2 text-center font-mono text-[0.6875rem] text-fg-muted sm:flex-1">
            {step}
          </li>
          {index < steps.length - 1 && (
            <li
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center py-0.5 sm:px-2 sm:py-0"
            >
              <ArrowRight className="hidden h-3.5 w-3.5 text-border-strong sm:block" />
              <span className="h-3 w-px bg-border-strong sm:hidden" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
