import { ArrowRight, GitPullRequest } from "lucide-react";
import { ProjectLogo } from "@/components/projects/project-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { contributions } from "@/data/open-source";

export function OpenSourceHighlight() {
  const contribution = contributions[0];
  if (!contribution) return null;

  const primary = contribution.links[0];

  return (
    <Section label="Open Source" className="border-b border-border">
      <div className="rounded-xl border border-border bg-bg-inset p-6 sm:p-8">
        <div className="flex items-center gap-4">
          {contribution.logo && (
            <ProjectLogo
              src={contribution.logo}
              name={contribution.project}
              size={44}
            />
          )}
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[0.6875rem] text-fg-muted">
              <GitPullRequest className="h-3.5 w-3.5" aria-hidden="true" />
              {contribution.status}
            </span>
            <span className="font-mono text-[0.6875rem] text-fg-subtle">
              {contribution.project} · {contribution.area}
            </span>
          </div>
        </div>

        <h2 className="mt-5 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
          A merged fix in LangChain — and the reasoning that got there.
        </h2>

        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
          {contribution.summary}
        </p>

        {/* The PR numbers are the verifiable part of this claim, so they get
            their own row rather than living only inside the paragraph. */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {contribution.links
            .filter((link) => link.icon === "pr")
            .map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-subtle px-2.5 py-1.5 font-mono text-[0.6875rem] text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  <GitPullRequest className="h-3.5 w-3.5" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/open-source" variant="secondary">
            Read the investigation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          {primary && (
            <ButtonLink href={primary.href} external variant="ghost">
              View {primary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
