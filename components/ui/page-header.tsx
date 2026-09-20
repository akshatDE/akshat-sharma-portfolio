import { Container } from "./container";
import { SectionLabel } from "./section-label";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Consistent top-of-page block for every route outside the home page. */
export function PageHeader({
  label,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-bg-subtle py-14 sm:py-16">
      <Container>
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  );
}
