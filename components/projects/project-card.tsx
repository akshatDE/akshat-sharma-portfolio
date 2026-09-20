import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { TagList } from "@/components/ui/tag";
import { SocialIcon } from "@/components/ui/social-icon";
import { ProjectStatusBadge } from "./project-status-badge";

/**
 * A project card is a summary of an engineering story, not a badge shelf:
 * what it is, what it achieved, and a way into the full case study.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-bg-inset p-5 transition-colors hover:border-border-strong sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-fg">
            <Link
              href={`/projects/${project.slug}`}
              className="before:absolute before:inset-0 before:content-['']"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 font-mono text-xs text-fg-subtle">
            {project.subtitle}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-fg-subtle">
            {project.domain}
          </span>
          {project.status && <ProjectStatusBadge status={project.status} />}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
        {project.summary}
      </p>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm text-fg-muted">
            <span
              className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-border-strong"
              aria-hidden="true"
            />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex-1" />

      <TagList items={project.stack} limit={6} className="mt-1" />

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          Read case study
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        {project.links.github && (
          // Sits above the card-wide overlay link so it stays independently clickable.
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
          >
            <SocialIcon name="github" className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
