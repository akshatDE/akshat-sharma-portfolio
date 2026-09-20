import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { spellNumber } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

const projectCount = spellNumber(projects.length);

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Agentic AI systems, data platforms and streaming lakehouses — each with a full case study covering architecture, decisions and trade-offs.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Systems I have built"
        description={`${projectCount.charAt(0).toUpperCase()}${projectCount.slice(1)} projects, each written up as a case study rather than a screenshot. The interesting part of a system is usually the decision that did not make it into the diagram.`}
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
}
