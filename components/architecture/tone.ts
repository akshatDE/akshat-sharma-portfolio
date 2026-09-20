import type { NodeTone } from "@/lib/types";

/**
 * Tone → CSS custom property.
 *
 * Colour is applied to a small dot rather than the node fill, which keeps a
 * seven-stage diagram from reading as a rainbow and keeps contrast correct in
 * both themes without a second palette.
 */
const toneVars: Record<NodeTone, string> = {
  source: "var(--tone-source)",
  ingest: "var(--tone-ingest)",
  process: "var(--tone-process)",
  storage: "var(--tone-storage)",
  quality: "var(--tone-quality)",
  serve: "var(--tone-serve)",
  ai: "var(--tone-ai)",
};

export const toneLabels: Record<NodeTone, string> = {
  source: "Source",
  ingest: "Ingestion",
  process: "Processing",
  storage: "Storage",
  quality: "Quality",
  serve: "Serving",
  ai: "AI",
};

export function toneColor(tone: NodeTone = "process"): string {
  return toneVars[tone];
}
