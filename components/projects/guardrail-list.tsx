import { ShieldCheck } from "lucide-react";
import type { Guardrails } from "@/lib/types";

/**
 * Deterministic safety layer. Rendered as a distinct block because the
 * separation between what the model proposes and what code enforces is the
 * most important idea in the project it belongs to.
 */
export function GuardrailList({ guardrails }: { guardrails: Guardrails }) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <ShieldCheck
          className="h-4 w-4 text-fg-muted"
          aria-hidden="true"
        />
        <h3 className="text-sm font-semibold tracking-tight text-fg">
          {guardrails.title}
        </h3>
      </div>

      <blockquote className="mt-4 border-l-2 border-border-strong pl-4 text-[0.9375rem] italic leading-relaxed text-fg-muted">
        {guardrails.principle}
      </blockquote>

      <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {guardrails.rules.map((rule, index) => (
          <li key={rule.rule} className="bg-bg-inset p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[0.625rem] text-fg-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-fg">{rule.rule}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
              {rule.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
