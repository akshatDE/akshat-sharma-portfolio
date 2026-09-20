import type { Metadata } from "next";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { CompanyLogo } from "@/components/ui/company-logo";
import { LogoTile } from "@/components/ui/logo-tile";
import { TagList } from "@/components/ui/tag";
import { TechChip } from "@/components/ui/tech-chip";
import {
  certifications,
  education,
  experience,
  outsideExperience,
} from "@/data/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description:
    "Production data engineering: ETL/ELT pipelines, a 10M+ record migration with zero data loss, and analytics systems serving government stakeholders.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience"
        title="Where I have worked"
        description="Three years building and operating data pipelines in production, where the constraint was usually correctness under real-world source data rather than scale."
      />

      <Container className="py-14 sm:py-16">
        <SectionLabel>Professional Experience</SectionLabel>
        <ol className="mt-6 space-y-8">
          {experience.map((role) => (
            <li
              key={`${role.company}-${role.start}`}
              className="rounded-xl border border-border bg-bg-inset p-6 sm:p-8"
            >
              {role.logo && (
                <div className="mb-6">
                  <CompanyLogo src={role.logo} company={role.company} />
                </div>
              )}

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-fg">
                    {role.title}
                  </h2>
                  <p className="mt-1 text-sm text-fg-muted">{role.company}</p>
                </div>
                <div className="shrink-0 font-mono text-xs text-fg-subtle sm:text-right">
                  <p>
                    {role.start} — {role.end}
                  </p>
                  {role.location && <p className="mt-0.5">{role.location}</p>}
                </div>
              </div>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">
                {role.summary}
              </p>

              <ul className="mt-5 space-y-3">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      className="mt-[0.5625rem] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-fg-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <TagList
                items={role.stack}
                className="mt-6 border-t border-border pt-5"
              />
            </li>
          ))}
        </ol>

        <section className="mt-16">
          <SectionLabel>Outside Experience</SectionLabel>
          <ul className="mt-6 space-y-4">
            {outsideExperience.map((role) => (
              <li
                key={`${role.organization}-${role.title}`}
                className="rounded-xl border border-border bg-bg-inset p-6 sm:p-8"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-fg">
                      {role.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <TechChip name={role.organization} />
                      <span className="text-sm text-fg-muted">
                        {role.affiliation}
                      </span>
                    </div>
                  </div>
                  {role.period && (
                    <p className="shrink-0 font-mono text-xs text-fg-subtle">
                      {role.period}
                    </p>
                  )}
                </div>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {role.summary}
                </p>

                <ul className="mt-5 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        className="mt-[0.5625rem] h-1 w-1 shrink-0 rounded-full bg-border-strong"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-fg-muted">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                {role.url && (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-fg-muted"
                  >
                    {role.organization}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <SectionLabel>Education</SectionLabel>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {education.map((item) => (
              <li key={item.degree} className="bg-bg-inset p-5 sm:p-6">
                {item.logo ? (
                  <LogoTile
                    src={item.logo}
                    name={item.institution}
                    size={52}
                  />
                ) : (
                  <GraduationCap
                    className="h-4 w-4 text-fg-subtle"
                    aria-hidden="true"
                  />
                )}
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-fg">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">{item.institution}</p>
                <div className="mt-2 space-y-0.5 font-mono text-[0.6875rem] text-fg-subtle">
                  {item.focus && <p>{item.focus}</p>}
                  {item.period && <p>{item.period}</p>}
                  {item.detail && <p>{item.detail}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <SectionLabel>Certifications</SectionLabel>
          <ul className="mt-6 space-y-3">
            {certifications.map((item) => (
              <li
                key={item.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-bg-inset p-4"
              >
                <Award
                  className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-fg">{item.name}</p>
                  <p className="mt-0.5 font-mono text-[0.6875rem] text-fg-subtle">
                    {item.issuer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
