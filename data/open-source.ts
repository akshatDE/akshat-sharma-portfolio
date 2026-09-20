/**
 * Open-source contributions.
 *
 * Links are the real ones from the resume: the original proposed fix and the
 * merged PR that carried it upstream.
 */

export interface ContributionLink {
  label: string;
  href: string;
  icon: "pr" | "repo";
}

export interface Contribution {
  project: string;
  projectUrl: string;
  /** Path under /public. The mark carries its own background, so it renders
   *  as a logo tile rather than adapting to the theme. */
  logo?: string;
  /** Short label for the area of the codebase touched. */
  area: string;
  role: string;
  status: "Merged" | "Open" | "In review";
  summary: string;
  /** The investigation, told as a sequence of steps. */
  investigation: { step: string; detail: string }[];
  learned: { title: string; body: string }[];
  links: ContributionLink[];
}

const LANGCHAIN = "https://github.com/langchain-ai/langchain";

export const contributions: Contribution[] = [
  {
    project: "LangChain",
    projectUrl: LANGCHAIN,
    logo: "/images/langchain.jpg",
    area: "Perplexity chat model integration",
    role: "Diagnosis and fix",
    status: "Merged",
    summary:
      "Diagnosed a sync/async streaming inconsistency in LangChain's Perplexity integration that corrupted response metadata across streamed chunks. Proposed the original fix in PR #38796; the diagnosis and fix were credited in merged PR #39924 and incorporated upstream.",
    investigation: [
      {
        step: "Reproduce the inconsistency",
        detail:
          "The first task was establishing that the sync and async streaming paths disagreed with each other — and with the non-streaming path — about the metadata attached to a response. A bug you cannot reproduce on demand is a bug you cannot claim to have fixed.",
      },
      {
        step: "Read the streaming path, not the whole codebase",
        detail:
          "Streaming assembles a response incrementally from chunks, so metadata has to be accumulated across chunks rather than read once from a complete payload. That narrowed the interesting code to the chunk-merging logic rather than the client, and to the places where the sync and async implementations had drifted apart.",
      },
      {
        step: "Understand the contract before changing it",
        detail:
          "LangChain's chat model interface is implemented by dozens of providers and depended on by far more user code. The relevant question was what the interface promises about metadata, so the fix converged on that contract rather than inventing local behaviour.",
      },
      {
        step: "Read the existing tests first",
        detail:
          "The test suite is the most precise available statement of intended behaviour. Reading it showed which cases were already covered, which were not, and what shape a new test needed to take to be accepted.",
      },
      {
        step: "Consider compatibility implications",
        detail:
          "Anything that changes what a response object contains is potentially breaking for downstream code reading those fields. Scoping the change to make the streaming paths consistent with the already-correct non-streaming path kept it a fix rather than a behaviour change.",
      },
      {
        step: "Submit, respond to review, land it",
        detail:
          "The original fix went up as PR #38796. Maintainer review on a project this widely used is a genuine design conversation, and the diagnosis and fix were ultimately credited and incorporated through merged PR #39924.",
      },
    ],
    learned: [
      {
        title: "Debugging an unfamiliar production codebase",
        body: "The efficient path is narrowing to the smallest code region that could produce the symptom, then reading that region properly — not skimming the whole repository. Reproduction first, reading second, editing last.",
      },
      {
        title: "Sync and async paths drift",
        body: "When the same logic is implemented twice — once blocking, once not — they diverge quietly. A bug that appears in only one of them is usually a sign that the two implementations were maintained separately rather than sharing a core.",
      },
      {
        title: "Streaming has its own failure modes",
        body: "Incremental assembly introduces questions that a single complete response never raises: what accumulates, what overwrites, and what the final state should be when chunks disagree. Most streaming bugs live in that merge step.",
      },
      {
        title: "Reason before implementing",
        body: "The first fix that makes a symptom disappear is often the wrong one. Understanding why the code was written the way it was is what separates a fix from a patch that breaks something else.",
      },
      {
        title: "Tests are documentation",
        body: "In a fast-moving repository, the test suite is more current and more precise than the prose docs. It is the fastest way to learn what a component actually guarantees.",
      },
      {
        title: "Compatibility is a real constraint",
        body: "In a library with this many dependents, the blast radius of a change is part of its design. Scope discipline is what makes a contribution mergeable.",
      },
    ],
    links: [
      { label: "Merged PR #39924", href: `${LANGCHAIN}/pull/39924`, icon: "pr" },
      { label: "Original PR #38796", href: `${LANGCHAIN}/pull/38796`, icon: "pr" },
      { label: "LangChain on GitHub", href: LANGCHAIN, icon: "repo" },
    ],
  },
];
