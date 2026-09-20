import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram";
import {
  BulletList,
  CaseStudySection,
  Paragraphs,
} from "@/components/projects/case-study-section";
import {
  DecisionList,
  TradeOffList,
} from "@/components/projects/decision-list";
import { GuardrailList } from "@/components/projects/guardrail-list";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { TagList } from "@/components/ui/tag";
import { getProject, getProjectSlugs, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return buildMetadata({
    title: `${project.name} — ${project.subtitle}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    tags: project.stack,
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="border-b border-border bg-bg-subtle py-12 sm:py-14">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-subtle transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] text-fg-subtle">
            <span className="rounded-md border border-border bg-bg-inset px-2 py-0.5 uppercase tracking-wider">
              {project.domain}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.period}</span>
            {project.status && (
              <ProjectStatusBadge status={project.status} className="ml-1" />
            )}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-fg-muted">
            {project.subtitle}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          <TagList items={project.stack} className="mt-6" />

          {project.links.github && (
            <div className="mt-7">
              <ButtonLink href={project.links.github} external>
                <SocialIcon name="github" />
                View on GitHub
              </ButtonLink>
            </div>
          )}
        </Container>
      </header>

      <Container width="prose" className="py-14 sm:py-16">
        <div className="space-y-12">
          <CaseStudySection index={1} title="Overview">
            <Paragraphs items={project.caseStudy.overview} />
          </CaseStudySection>

          <CaseStudySection index={2} title="Problem">
            <Paragraphs items={project.caseStudy.problem} />
          </CaseStudySection>

          <CaseStudySection index={3} title="Architecture">
            <Paragraphs items={project.caseStudy.architecture} />
            <ArchitectureDiagram diagram={project.diagram} className="mt-8" />
          </CaseStudySection>

          <CaseStudySection index={4} title="Implementation">
            <Paragraphs items={project.caseStudy.implementation} />
            {project.caseStudy.guardrails && (
              <div className="mt-8">
                <GuardrailList guardrails={project.caseStudy.guardrails} />
              </div>
            )}
          </CaseStudySection>

          <CaseStudySection index={5} title="Engineering Decisions">
            <DecisionList items={project.caseStudy.decisions} />
          </CaseStudySection>

          <CaseStudySection index={6} title="Trade-offs">
            <TradeOffList items={project.caseStudy.tradeOffs} />
          </CaseStudySection>

          <CaseStudySection index={7} title="Challenges">
            <BulletList items={project.caseStudy.challenges} />
          </CaseStudySection>

          <CaseStudySection index={8} title="What I Learned">
            <BulletList items={project.caseStudy.learned} />
          </CaseStudySection>

          <CaseStudySection index={9} title="Future Improvements">
            <BulletList items={project.caseStudy.future} />
          </CaseStudySection>
        </div>

        {next && next.slug !== project.slug && (
          <nav
            aria-label="Next project"
            className="mt-14 border-t border-border pt-8"
          >
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-bg-inset p-5 transition-colors hover:border-border-strong"
            >
              <span className="min-w-0">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
                  Next project
                </span>
                <span className="mt-1.5 block text-base font-semibold tracking-tight text-fg">
                  {next.name}
                </span>
                <span className="mt-0.5 block font-mono text-xs text-fg-subtle">
                  {next.subtitle}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </nav>
        )}
      </Container>
    </article>
  );
}
