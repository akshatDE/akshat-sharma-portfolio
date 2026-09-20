export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "Understand before abstracting",
    body: "I prefer understanding the underlying mechanism before relying on a framework. An agent loop, a retry policy, a partitioning scheme — once you have written the naive version, you can read the library's source and know exactly what it bought you.",
  },
  {
    title: "Models reason. Code enforces invariants.",
    body: "Use an LLM where probabilistic reasoning genuinely helps: interpreting intent, drafting a query, summarising a document. Keep security, permissions, validation and execution limits in deterministic code, where they can be tested and cannot be talked out of.",
  },
  {
    title: "Architecture is about trade-offs",
    body: "No technology is universally correct. Kafka is right when you need replayable ordered streams and wrong when a scheduled batch would do. The useful question is never \"is this good?\" but \"which constraint does this relax, and what does it cost me elsewhere?\"",
  },
  {
    title: "Build from fundamentals",
    body: "Frameworks churn on a six-month cycle. Distributed systems behaviour, data modelling, API design, state management and failure semantics do not. Time spent on the second category keeps paying out after the first has been rewritten.",
  },
];
