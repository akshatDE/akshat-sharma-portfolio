/**
 * Shared domain types.
 *
 * Kept in lib/ so that data/ (content) and components/ (presentation) can both
 * depend on them without depending on each other.
 */

/** Semantic role of a node in an architecture diagram; drives its colour. */
export type NodeTone =
  | "source"
  | "ingest"
  | "process"
  | "storage"
  | "quality"
  | "serve"
  | "ai";

export interface DiagramNode {
  label: string;
  /** Secondary line — usually the concrete technology. */
  detail?: string;
  tone?: NodeTone;
}

export interface DiagramStage {
  /** Optional lane label rendered beside the stage (e.g. "Bronze"). */
  lane?: string;
  /** Multiple nodes render side by side to show parallel components. */
  nodes: DiagramNode[];
  /** Short annotation rendered under the stage. */
  note?: string;
}

export interface Diagram {
  caption?: string;
  stages: DiagramStage[];
}

/** An architectural decision and the reasoning behind it. */
export interface Decision {
  decision: string;
  rationale: string;
}

/** An explicit trade-off: what was chosen, what was given up, and why. */
export interface TradeOff {
  chose: string;
  over: string;
  because: string;
}

/** A deterministic guardrail layer (used by the Text-to-SQL case study). */
export interface Guardrails {
  title: string;
  principle: string;
  rules: { rule: string; detail: string }[];
}

export interface CaseStudy {
  overview: string[];
  problem: string[];
  architecture: string[];
  implementation: string[];
  decisions: Decision[];
  tradeOffs: TradeOff[];
  challenges: string[];
  learned: string[];
  future: string[];
  guardrails?: Guardrails;
}

export type ProjectDomain =
  | "AI Engineering"
  | "Data Engineering"
  | "Data Platform"
  | "Streaming";

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  /** One or two sentences used on cards and in metadata. */
  summary: string;
  period: string;
  domain: ProjectDomain;
  featured: boolean;
  /** Technologies, ordered roughly by prominence in the system. */
  stack: string[];
  /** Three short, concrete outcomes shown on the project card. */
  highlights: string[];
  links: {
    github?: string;
    demo?: string;
  };
  diagram: Diagram;
  caseStudy: CaseStudy;
}
