import { Brain, Database, Terminal } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { skillGroups } from "@/data/skills";

const icons = {
  database: Database,
  brain: Brain,
  terminal: Terminal,
} as const;

export function TechnicalFocus() {
  return (
    <Section
      label="Technical Focus"
      title="Three domains, one system"
      description="Data platforms feed the models, the models sit inside services, and the services need the same engineering discipline as everything else."
      className="border-b border-border"
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div key={group.id} className="flex flex-col bg-bg-inset p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-fg-muted" aria-hidden="true" />
                <h3 className="text-sm font-semibold tracking-tight text-fg">
                  {group.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {group.summary}
              </p>

              <div className="mt-6 space-y-4">
                {group.clusters.map((cluster) => (
                  <div key={cluster.label}>
                    <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
                      {cluster.label}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {cluster.items.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
