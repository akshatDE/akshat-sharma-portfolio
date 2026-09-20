import type { DiagramNode as DiagramNodeType } from "@/lib/types";
import { toneColor } from "./tone";

export function DiagramNode({ node }: { node: DiagramNodeType }) {
  return (
    <div className="flex h-full items-start gap-2.5 rounded-lg border border-border bg-bg-inset px-3.5 py-3 shadow-[var(--shadow-card)]">
      <span
        className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: toneColor(node.tone) }}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-sm font-medium leading-snug text-fg">{node.label}</p>
        {node.detail && (
          <p className="mt-1 font-mono text-[0.6875rem] leading-snug text-fg-subtle">
            {node.detail}
          </p>
        )}
      </div>
    </div>
  );
}
