import { Section } from "@/components/ui/section";
import { principles } from "@/data/principles";

export function Principles() {
  return (
    <Section
      label="Engineering Principles"
      title="How I make decisions"
      description="Four positions that show up repeatedly in the projects below."
      className="border-b border-border"
    >
      <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {principles.map((principle, index) => (
          <li key={principle.title} className="bg-bg-inset p-5 sm:p-6">
            <span className="font-mono text-[0.625rem] text-fg-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-base font-semibold tracking-tight text-fg">
              {principle.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {principle.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
