import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Journey } from "@/components/about/journey";
import { FlowStrip } from "@/components/architecture/flow-strip";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionLabel } from "@/components/ui/section-label";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "From computer science to production data systems to agentic AI — how I got here and what I am working on now.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="How I got here"
        description="Less a biography than the sequence of problems that pulled me from one thing to the next."
      />

      <Container width="prose" className="py-14 sm:py-16">
        <section>
          <SectionLabel>The path</SectionLabel>
          <Journey />
        </section>

        <section className="mt-16 border-t border-border pt-10">
          <SectionLabel>Now</SectionLabel>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-fg">
            Where data infrastructure and intelligent systems meet
          </h2>

          <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            <p>
              What interests me now is the seam between those two halves. A
              retrieval system is a data pipeline with a different consumer. An
              agent calling tools is a distributed system with an unusually
              unpredictable scheduler. A model writing SQL is a query planner
              that needs a permissions layer around it.
            </p>
            <p>
              The failure modes on the AI side are mostly familiar ones wearing
              new clothes — stale data, unclear contracts, missing validation,
              no observability. The engineering that makes a data platform
              trustworthy is largely the same engineering that makes an AI
              system trustworthy, which is a useful thing to notice early.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
              The shape most of my work takes
            </p>
            <FlowStrip
              className="mt-3"
              steps={[
                "Sources",
                "Ingestion",
                "Processing",
                "Storage",
                "Analytics / AI",
              ]}
            />
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10">
          <SectionLabel>Outside the work</SectionLabel>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">
            I keep an Obsidian vault that I have been writing into for years,
            which is how {" "}
            <Link
              href="/projects/abhyasmitra"
              className="text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              AbhyasMitra
            </Link>{" "}
            came about — it started as a way to stop re-reading notes and
            actually test myself on them. Most of what I build begins as
            something I wanted to exist for my own use.
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-xl font-semibold tracking-tight text-fg">
            Get in touch
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            I am looking for data engineering and AI engineering work,
            especially where both are in scope. The fastest way to reach me is
            email.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`} variant="primary">
              {profile.email}
            </ButtonLink>
            <ButtonLink href="/projects">
              See the work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
