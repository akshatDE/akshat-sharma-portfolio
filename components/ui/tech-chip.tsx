import type { CSSProperties } from "react";
import { techIcon } from "./tech-icons";
import { cn } from "@/lib/utils";

/**
 * A technology chip with its brand mark.
 *
 * Not every technology has a mark — Simple Icons dropped AWS, OpenAI, Tableau,
 * dbt and Groq after trademark requests, and several entries here are concepts
 * rather than products. Those render as a label alone, which is why the icon is
 * optional rather than a required field on the data.
 */
export function TechChip({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icon = techIcon(name);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-tight text-fg-muted",
        className,
      )}
    >
      {icon && (
        <svg
          viewBox="0 0 24 24"
          className="tech-icon h-3 w-3 shrink-0"
          style={
            {
              "--icon-light": icon.light,
              "--icon-dark": icon.dark,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          <path d={icon.path} fill="currentColor" />
        </svg>
      )}
      {name}
    </span>
  );
}
