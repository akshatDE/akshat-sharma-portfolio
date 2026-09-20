import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { certifications, education, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: `Resume for ${profile.name}, ${profile.role}.`,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        label="Resume"
        title="Resume"
        description="The PDF is the canonical version. A short summary is below if you would rather not open it."
      >
        <div className="flex flex-wrap gap-3">
          {/* Both actions point at profile.resumePath — swap the file in
              /public and neither of these needs to change. */}
          <ButtonLink href={profile.resumePath} variant="primary" external>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Open PDF
          </ButtonLink>
          <a
            href={profile.resumePath}
            download={`${profile.name.replace(/\s+/g, "-")}-Resume.pdf`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-muted"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </PageHeader>

      <Container className="py-14 sm:py-16">
        <section>
          <SectionLabel>Summary</SectionLabel>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
            {profile.intro}
          </p>
        </section>

        <section className="mt-12">
          <SectionLabel>Experience</SectionLabel>
          <ul className="mt-5 space-y-6">
            {experience.map((role) => (
              <li key={`${role.company}-${role.start}`}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="text-sm font-semibold text-fg">
                    {role.title} · {role.company}
                  </h2>
                  <p className="shrink-0 font-mono text-xs text-fg-subtle">
                    {role.start} — {role.end}
                    {role.location && ` · ${role.location}`}
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
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
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <SectionLabel>Education</SectionLabel>
          <ul className="mt-5 space-y-3">
            {education.map((item) => (
              <li
                key={item.degree}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm font-medium text-fg">
                  {item.degree}
                  {item.focus && (
                    <span className="font-normal text-fg-muted">
                      {" "}
                      — {item.focus}
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-mono text-xs text-fg-subtle sm:text-right">
                  {item.institution}
                  {(item.period || item.detail) && (
                    <span className="block">
                      {[item.period, item.detail].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <SectionLabel>Skills</SectionLabel>
          <dl className="mt-5 space-y-4">
            {skillGroups.map((group) => (
              <div
                key={group.id}
                className="flex flex-col gap-1 sm:flex-row sm:gap-6"
              >
                <dt className="w-40 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle sm:pt-1">
                  {group.title}
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed text-fg-muted">
                  {group.clusters.flatMap((cluster) => cluster.items).join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <SectionLabel>Certifications</SectionLabel>
          <ul className="mt-5 space-y-2">
            {certifications.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-[0.9375rem] text-fg-muted">
                  {item.name}
                </span>
                <span className="shrink-0 font-mono text-xs text-fg-subtle">
                  {item.issuer}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <p className="text-sm text-fg-muted">
            Full PDF:{" "}
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {profile.resumePath}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
