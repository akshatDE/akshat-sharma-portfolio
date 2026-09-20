import { SectionLabel } from "@/components/ui/section-label";

/** One numbered section of a case study. */
export function CaseStudySection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <SectionLabel>{String(index).padStart(2, "0")}</SectionLabel>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Paragraph list used by the prose-shaped case-study sections. */
export function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-4">
      {items.map((text) => (
        <p key={text} className="text-[0.9375rem] leading-relaxed text-fg-muted">
          {text}
        </p>
      ))}
    </div>
  );
}

/** Bulleted list used by Challenges, What I Learned and Future Improvements. */
export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.5625rem] h-1 w-1 shrink-0 rounded-full bg-border-strong"
            aria-hidden="true"
          />
          <span className="text-[0.9375rem] leading-relaxed text-fg-muted">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
