/**
 * Minimal class joiner.
 *
 * Deliberately not clsx + tailwind-merge: this codebase composes classes with
 * explicit conditionals rather than merging conflicting utility sets, so the
 * two dependencies would solve a problem it does not have.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Renders an ISO date as "12 March 2025" in a stable, locale-independent way. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
] as const;

/**
 * Spells small numbers so body copy can state a count without hardcoding it.
 * Falls back to digits above twelve, where words stop reading naturally.
 */
export function spellNumber(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}
