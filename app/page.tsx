import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { OpenSourceHighlight } from "@/components/home/open-source-highlight";
import { Principles } from "@/components/home/principles";
import { TechnicalFocus } from "@/components/home/technical-focus";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { featuredProjects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechnicalFocus />

      <Section
        label="Selected Work"
        title="Projects"
        description="Each of these has a full case study covering the architecture, the decisions behind it, and what the trade-offs cost."
        className="border-b border-border"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8">
          <ButtonLink href="/projects">
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Section>

      <OpenSourceHighlight />
      <Principles />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Get in touch
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              I am interested in data platform and AI engineering work,
              particularly where the two overlap. If you are building something
              in that space, I would like to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                {profile.email}
              </ButtonLink>
              <ButtonLink href="/about">
                More about me
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
