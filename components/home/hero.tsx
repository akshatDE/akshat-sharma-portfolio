import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Dot grid, faded out toward the bottom. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,var(--border-strong)_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        {/*
          The portrait is first in the DOM so it leads on mobile, then moves to
          the second column on large screens via explicit grid placement — one
          image element rather than a duplicated mobile/desktop pair.
        */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="lg:col-start-2 lg:row-start-1">
            <Image
              src="/images/akshat-sharma.jpg"
              alt={`Illustrated portrait of ${profile.name}`}
              width={640}
              height={640}
              priority
              sizes="(min-width: 1024px) 288px, 112px"
              className="h-28 w-28 rounded-2xl border border-border object-cover shadow-[var(--shadow-card)] sm:h-32 sm:w-32 lg:h-72 lg:w-72"
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-1">
            {profile.status && (
              <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-bg-inset px-3 py-1 font-mono text-[0.6875rem] text-fg-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--tone-storage)]"
                  aria-hidden="true"
                />
                {profile.status}
              </p>
            )}

            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 font-mono text-base tracking-tight text-fg-muted sm:text-lg">
              {profile.title}
            </p>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg sm:leading-relaxed">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects" variant="primary">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/resume">
                <FileText className="h-4 w-4" aria-hidden="true" />
                View Resume
              </ButtonLink>
              <ButtonLink href={profile.social.github} external>
                <SocialIcon name="github" />
                GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
