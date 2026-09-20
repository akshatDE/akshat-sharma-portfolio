import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
        The link may be out of date, or the page may have been renamed.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary">
          Home
        </ButtonLink>
        <ButtonLink href="/projects">
          Projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Container>
  );
}
