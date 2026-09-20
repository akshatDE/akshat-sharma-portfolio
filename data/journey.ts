export interface JourneyStep {
  stage: string;
  /** One or two sentences. The About page is a story, not a CV. */
  body: string;
}

export const journey: JourneyStep[] = [
  {
    stage: "Computer Science",
    body: "Started with the fundamentals — data structures, operating systems, networks, databases. The part that stuck was less any individual subject than the habit of asking what a system is actually doing underneath the interface.",
  },
  {
    stage: "Data Engineering",
    body: "Moved into pipelines, and found the problem I still find most interesting: data that is wrong is worse than data that is missing, because someone will act on it.",
  },
  {
    stage: "Production Data Systems",
    body: "Three years owning ingestion, modelling and reporting for analytics that government stakeholders used. Production teaches things a project cannot — schema drift, encodings, partial failures, and the difference between a pipeline that runs and one you can trust at 3am.",
  },
  {
    stage: "MS in Business Analytics — AI & Data Analytics",
    body: "Went back to study the analytical and statistical side properly, and arrived while the ground was shifting under it. The interesting question stopped being 'what does this data say' and became 'what happens when a model sits inside the system'.",
  },
  {
    stage: "AI Engineering",
    body: "Started treating an LLM as a component rather than a product: something with a latency profile, a failure mode and an interface, sitting inside a system that still needs validation, permissions and tests.",
  },
  {
    stage: "Agentic Systems",
    body: "Built an agent loop from scratch to understand what the frameworks were doing, then replaced its hardcoded tool registry with MCP. Most of what I learned was about control flow and trust boundaries, not about prompting.",
  },
  {
    stage: "Open Source",
    body: "Contributing to LangChain forced a different discipline: reproduce before reading, reason before implementing, and scope a change so that people you will never meet can keep depending on the code.",
  },
];
