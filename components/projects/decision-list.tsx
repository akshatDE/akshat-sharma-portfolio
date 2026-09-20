import type { Decision, TradeOff } from "@/lib/types";

/** Decision + rationale pairs. */
export function DecisionList({ items }: { items: readonly Decision[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li
          key={item.decision}
          className="rounded-lg border border-border bg-bg-inset p-4 sm:p-5"
        >
          <p className="text-sm font-medium leading-snug text-fg">
            {item.decision}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
            {item.rationale}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Trade-offs render as "chose X over Y" so the thing given up is as visible as
 * the thing chosen — that contrast is the whole point of the section.
 */
export function TradeOffList({ items }: { items: readonly TradeOff[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li
          key={item.chose}
          className="rounded-lg border border-border bg-bg-inset p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
              Chose
            </span>
            <span className="text-sm font-medium text-fg">{item.chose}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
              Over
            </span>
            <span className="text-sm text-fg-muted line-through decoration-border-strong">
              {item.over}
            </span>
          </div>
          <p className="mt-3 border-t border-border pt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
            {item.because}
          </p>
        </li>
      ))}
    </ul>
  );
}
