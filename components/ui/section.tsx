import { Container } from "./container";
import { SectionLabel } from "./section-label";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Eyebrow text. Omit for an unlabelled section. */
  label?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  label,
  title,
  description,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container>
        {(label || title || description) && (
          <header className="mb-10 max-w-2xl">
            {label && <SectionLabel>{label}</SectionLabel>}
            {title && (
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
