import type { Metadata } from "next";
import { GitPullRequest } from "lucide-react";
import { ProjectLogo } from "@/components/projects/project-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { SocialIcon } from "@/components/ui/social-icon";
import { contributions } from "@/data/open-source";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Open Source",
  description:
    "Diagnosing a streaming metadata inconsistency in LangChain's Perplexity integration, and what contributing to a widely used codebase teaches you.",
  path: "/open-source",
});

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        label="Open Source"
        title="Contributing to code I did not write"
        description="Working in a codebase used by a very large number of people is a different constraint from working on your own projects. The bar is not 'does this work' — it is correct, minimal, tested, and explainable to whoever maintains it next."
      />

      <Container width="prose" className="py-14 sm:py-16">
        {contributions.map((contribution) => (
          <article key={contribution.project} className="space-y-12">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[0.6875rem] text-fg-muted">
                  <GitPullRequest className="h-3.5 w-3.5" aria-hidden="true" />
                  {contribution.status}
                </span>
                <span className="font-mono text-[0.6875rem] text-fg-subtle">
                  {contribution.role}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                {contribution.logo && (
                  <ProjectLogo
                    src={contribution.logo}
                    name={contribution.project}
                    size={52}
                  />
                )}
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold tracking-tight text-fg">
                    {contribution.project}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-fg-muted">
                    {contribution.area}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                {contribution.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {contribution.links.map((link, index) => (
                  <ButtonLink
                    key={link.href}
                    href={link.href}
                    external
                    variant={index === 0 ? "primary" : "secondary"}
                  >
                    {link.icon === "pr" ? (
                      <GitPullRequest className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <SocialIcon name="github" />
                    )}
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </header>

            <section className="border-t border-border pt-10">
              <SectionLabel>The investigation</SectionLabel>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
                How I got to the fix
              </h3>

              <ol className="mt-7 space-y-px overflow-hidden rounded-xl border border-border bg-border">
                {contribution.investigation.map((step, index) => (
                  <li key={step.step} className="bg-bg-inset p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.625rem] text-fg-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-medium text-fg">
                        {step.step}
                      </h4>
                    </div>
                    <p className="mt-2 pl-[1.6rem] text-[0.9375rem] leading-relaxed text-fg-muted">
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="border-t border-border pt-10">
              <SectionLabel>Takeaways</SectionLabel>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
                What I learned
              </h3>

              <dl className="mt-7 space-y-6">
                {contribution.learned.map((item) => (
                  <div key={item.title}>
                    <dt className="text-sm font-semibold text-fg">
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        ))}
      </Container>
    </>
  );
}
