import { Fragment } from "react";
import type { Diagram } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Connector } from "./connector";
import { DiagramNode } from "./diagram-node";

/**
 * Vertical architecture diagram rendered as real DOM.
 *
 * Built from divs rather than an image or a diagram library because it needs to
 * be readable by a screen reader, correct in both themes, selectable as text,
 * and responsive — none of which a PNG or a canvas renderer gives you. The
 * stages are an ordered list, so the flow survives with styles disabled.
 */
export function ArchitectureDiagram({
  diagram,
  className,
}: {
  diagram: Diagram;
  className?: string;
}) {
  const lastIndex = diagram.stages.length - 1;
  const hasLanes = diagram.stages.some((stage) => stage.lane);

  return (
    <figure className={cn("w-full", className)}>
      <div className="rounded-xl border border-border bg-bg-subtle p-4 sm:p-6">
        <ol
          className={cn(
            "grid items-stretch gap-x-3 sm:gap-x-4",
            hasLanes
              ? "grid-cols-[3.25rem_minmax(0,1fr)] sm:grid-cols-[4.5rem_minmax(0,1fr)]"
              : "grid-cols-[minmax(0,1fr)]",
          )}
        >
          {diagram.stages.map((stage, index) => (
            <Fragment key={`${stage.nodes[0]?.label ?? "stage"}-${index}`}>
              {hasLanes && (
                <li
                  aria-hidden={!stage.lane}
                  className="flex items-center justify-end"
                >
                  {stage.lane && (
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
                      {stage.lane}
                    </span>
                  )}
                </li>
              )}

              <li className={cn(hasLanes && "col-start-2")}>
                <div
                  className={cn(
                    "grid gap-2",
                    stage.nodes.length === 2 && "sm:grid-cols-2",
                    stage.nodes.length >= 3 && "sm:grid-cols-3",
                  )}
                >
                  {stage.nodes.map((node) => (
                    <DiagramNode key={node.label} node={node} />
                  ))}
                </div>

                {stage.note && (
                  <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
                    {stage.note}
                  </p>
                )}
              </li>

              {index < lastIndex && (
                <>
                  {hasLanes && <li aria-hidden="true" />}
                  <li
                    aria-hidden="true"
                    className={cn(hasLanes && "col-start-2")}
                  >
                    <Connector />
                  </li>
                </>
              )}
            </Fragment>
          ))}
        </ol>
      </div>

      {diagram.caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-fg-subtle">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
