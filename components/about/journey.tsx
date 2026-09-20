import { journey } from "@/data/journey";

/**
 * Vertical progression rendered as an ordered list with a continuous rule.
 * The rule is drawn with a border on the list item rather than an absolutely
 * positioned element, so it stays correct at any text size.
 */
export function Journey() {
  return (
    <ol className="mt-8">
      {journey.map((step, index) => {
        const isLast = index === journey.length - 1;
        return (
          <li
            key={step.stage}
            className={`relative pl-8 ${isLast ? "" : "border-l border-border pb-9"}`}
          >
            <span
              className="absolute -left-[0.3125rem] top-[0.4375rem] h-2.5 w-2.5 rounded-full border-2 border-bg bg-border-strong"
              aria-hidden="true"
            />
            {isLast && (
              <span
                className="absolute left-0 top-0 h-[0.4375rem] w-px bg-border"
                aria-hidden="true"
              />
            )}
            <h3 className="text-sm font-semibold tracking-tight text-fg">
              {step.stage}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
              {step.body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
