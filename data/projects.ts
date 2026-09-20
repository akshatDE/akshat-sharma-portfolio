import type { Project } from "@/lib/types";
import { profile } from "./profile";

/**
 * Projects are structured TypeScript rather than Markdown.
 *
 * Case studies are not free-form prose: every one has the same nine sections
 * plus an architecture diagram made of typed nodes. Encoding that as data means
 * the compiler catches a missing section, and the diagram renders as real DOM
 * (accessible, themable, no image assets) instead of a screenshot.
 *
 */

const gh = (repo: string) => `${profile.social.github}/${repo}`;

export const projects: Project[] = [
  {
    slug: "agenticgpt",
    name: "AgenticGPT",
    subtitle: "Pure Python Agentic AI Architecture",
    summary:
      "An agentic AI system built from first principles — custom agent loop, tool schemas and MCP integration with no agent framework underneath.",
    period: "2025",
    domain: "AI Engineering",
    featured: true,
    stack: ["Python", "MCP", "Ollama", "Groq", "Tool calling", "JSON Schema"],
    highlights: [
      "Custom agent loop with no LangChain, LangGraph, CrewAI or AutoGen.",
      "MCP replaced a hardcoded tool registry, removing per-tool integration code.",
      "Runs against local models via Ollama or hosted models via Groq.",
    ],
    links: { github: gh("AgenticGPT") },
    diagram: {
      caption: "Request path for a single user turn.",
      stages: [
        { nodes: [{ label: "User", detail: "prompt", tone: "source" }] },
        {
          nodes: [
            {
              label: "Agent Loop",
              detail: "message state · turn budget",
              tone: "process",
            },
          ],
          note: "Owns control flow. Everything below is called from here.",
        },
        {
          nodes: [{ label: "LLM", detail: "Ollama · Groq", tone: "ai" }],
        },
        {
          nodes: [
            {
              label: "Tool Decision",
              detail: "parse + validate tool calls",
              tone: "quality",
            },
          ],
          note: "No tool call ends the turn. A malformed call is returned to the model as an error result, not raised.",
        },
        { nodes: [{ label: "MCP Client", detail: "stdio transport", tone: "process" }] },
        {
          nodes: [
            { label: "Filesystem", detail: "MCP server", tone: "serve" },
            { label: "Search", detail: "MCP server", tone: "serve" },
            { label: "Custom", detail: "MCP server", tone: "serve" },
          ],
          note: "Discovered at runtime via tools/list — adding a server adds tools without a code change.",
        },
        { nodes: [{ label: "External Tools", detail: "files · APIs · shell", tone: "storage" }] },
      ],
    },
    caseStudy: {
      overview: [
        "AgenticGPT is an agentic AI system written in plain Python. It deliberately avoids LangChain, LangGraph, CrewAI and AutoGen, because the goal was not to ship an agent quickly — it was to understand what an agent actually is once the framework is removed.",
        "Stripped down, it is a loop: send the conversation to a model, inspect the reply for tool calls, execute them, append the results as new messages, and repeat until the model stops asking for tools or a turn budget is exhausted. Everything else — retries, schemas, transport, safety limits — is detail hung off that loop.",
      ],
      problem: [
        "Agent frameworks make the control flow invisible. When an agent loops forever, silently truncates history, or calls a tool with the wrong argument shape, you end up debugging somebody else's abstraction rather than your own logic — and the stack trace passes through four layers of callbacks before it reaches anything you wrote.",
        "The second problem was tool integration. The first version used a hardcoded registry: every new capability meant writing a Python function, hand-writing its JSON Schema, registering it, and redeploying. Tool surface area grew linearly with integration work.",
      ],
      architecture: [
        "The agent holds exactly one piece of mutable state: an ordered list of messages. User turns, assistant replies, tool calls and tool results all append to it. There is no graph, no state machine and no checkpointer — the message list is the state, which is also what the model actually sees.",
        "Tool execution goes through an MCP client rather than a local function table. At startup the client launches the configured MCP servers over stdio, calls tools/list on each, and builds the tool schema array it passes to the model. Servers are separate processes, so a crashing tool cannot take down the agent.",
      ],
      implementation: [
        "The provider layer is a thin adapter — roughly sixty lines — that normalises Ollama and Groq responses into a single shape: content, tool calls, finish reason. Everything above it is provider-agnostic, which is what made swapping a local 8B model for a hosted one a config change rather than a refactor.",
        "Tool results are appended as messages with the originating call id, so the model can correlate a result with the call that produced it across multiple parallel requests in one turn.",
        "Argument validation happens before dispatch. If the model emits JSON that does not satisfy the tool's schema, the validation error is formatted and returned as the tool result. The model then usually corrects itself on the next turn — which is far better behaviour than an exception that kills the run.",
      ],
      decisions: [
        {
          decision: "A plain message list instead of a graph or state machine.",
          rationale:
            "Graph abstractions pay off when you have branching workflows to express declaratively. A single-agent tool loop has one edge. Adding a graph engine would have bought vocabulary, not capability.",
        },
        {
          decision: "MCP instead of a hardcoded tool registry.",
          rationale:
            "MCP turns tool integration into a discovery problem rather than a coding problem. The agent asks each server what it can do at startup; adding a server adds its tools with no change to the agent.",
        },
        {
          decision: "A hard max-turn ceiling, checked in the loop.",
          rationale:
            "Every tool-calling agent can loop. Heuristic stopping conditions are model-dependent and fail quietly. A counter is deterministic, testable, and fails loudly with the transcript intact.",
        },
        {
          decision: "Local models via Ollama as the default, Groq as opt-in.",
          rationale:
            "Local inference makes iteration free and keeps data on the machine during development. Groq exists for when latency or model quality matters more than either.",
        },
        {
          decision: "Validation errors returned as tool results, not raised.",
          rationale:
            "An exception ends the run and discards the context. A returned error gives the model the information it needs to fix its own call, which it usually does.",
        },
      ],
      tradeOffs: [
        {
          chose: "An explicit, hand-written agent loop",
          over: "LangGraph or CrewAI orchestration",
          because:
            "Every failure mode lives in code I wrote and appears in a stack trace I can read. The cost is that features frameworks give free — checkpointing, human-in-the-loop interrupts, multi-agent routing — are mine to build if I ever need them.",
        },
        {
          chose: "MCP over stdio",
          over: "HTTP-based tool services",
          because:
            "Local-first with no ports, no auth layer and process lifetime tied to the agent. The cost is that servers must run on the same machine, so remote tools need an HTTP transport later.",
        },
        {
          chose: "Sequential tool execution",
          over: "Parallel dispatch of independent calls",
          because:
            "Most calls in practice depended on a previous result, and sequential ordering makes transcripts readable. Parallelism is a latency optimisation worth adding once tool latency, not model latency, dominates.",
        },
        {
          chose: "No persistent memory layer",
          over: "A vector store for cross-session recall",
          because:
            "Within a session the message list is the memory. Persistent memory is a genuinely separate problem — retrieval quality, staleness, privacy — and bolting it on early would have blurred the thing I was trying to understand.",
        },
      ],
      challenges: [
        "Tool-call representation differs between providers: field names, whether arguments arrive as a JSON string or an object, and how parallel calls are grouped. Normalising this at the provider boundary kept the difference from leaking into the loop.",
        "Smaller local models produce malformed tool arguments far more often than hosted ones. This is what pushed validation from an afterthought into the loop's core error path.",
        "MCP servers are child processes, and an agent that exits without shutting them down leaves them running. Lifecycle management needed an explicit context manager rather than best-effort cleanup.",
        "Long tool outputs blow past the context window quickly. Truncating them needed a policy — head plus tail with a marker — because naive truncation removes exactly the part of the output the model needs.",
      ],
      learned: [
        "An agent framework is mostly a loop, a schema serialiser and a retry policy. Knowing that makes the framework easier to use, not redundant — you can predict what it will do.",
        "The valuable part of MCP is the discovery protocol, not the transport. Runtime tools/list is what removes integration work; the wire format is incidental.",
        "The turn budget is a safety mechanism, not a tuning knob. It belongs next to the loop counter, not in a config file where it can be raised to make a symptom disappear.",
        "Feeding errors back to the model instead of raising them changes agent reliability more than prompt engineering does.",
      ],
      future: [
        "Parallel execution for tool calls the model marks as independent.",
        "Streaming token output so long turns are observable while they run.",
        "Structured trace logging — one record per turn with model, tools called, latency and token counts.",
        "Sandboxing MCP servers so a filesystem tool cannot reach outside a declared root.",
      ],
    },
  },
  {
    slug: "abhyasmitra",
    name: "AbhyasMitra",
    subtitle: "Local-First AI Study Assistant",
    summary:
      "An active-recall study system built on top of my Obsidian vault. Questions are generated from my own notes and answers are graded against them, entirely on-device.",
    period: "2025",
    domain: "AI Engineering",
    featured: true,
    stack: ["Python", "Ollama", "Qwen", "Markdown", "Local LLMs"],
    highlights: [
      "Runs fully offline — notes never leave the machine.",
      "Feedback is grounded in the source note, not the model's own recall.",
      "Tracks recall performance per topic to target weak areas.",
    ],
    links: { github: gh("AbhyasMitra") },
    diagram: {
      caption: "One study cycle. Nothing in this path leaves the device.",
      stages: [
        { nodes: [{ label: "Markdown Notes", detail: "Obsidian vault", tone: "source" }] },
        {
          nodes: [{ label: "Knowledge Ingestion", detail: "parse · chunk · select", tone: "ingest" }],
          note: "Headings and links are kept, so a chunk carries the structure of the note it came from.",
        },
        { nodes: [{ label: "LLM", detail: "Qwen via Ollama", tone: "ai" }] },
        { nodes: [{ label: "Question Generation", detail: "scoped to one chunk", tone: "process" }] },
        { nodes: [{ label: "User Answer", detail: "free recall", tone: "source" }] },
        {
          nodes: [{ label: "Grounded Comparison", detail: "answer vs. source chunk", tone: "quality" }],
          note: "The source text is passed back in at grading time — the model judges against the note, not against memory.",
        },
        { nodes: [{ label: "Feedback", detail: "what was missed, and where", tone: "serve" }] },
        { nodes: [{ label: "Learning Metrics", detail: "per-topic recall history", tone: "storage" }] },
      ],
    },
    caseStudy: {
      overview: [
        "AbhyasMitra turns a personal Obsidian vault into an active-recall study loop. It reads Markdown notes, generates questions from a specific note, asks for a free-recall answer, and grades that answer against the note it came from.",
        "The whole system runs locally against a Qwen model served by Ollama. That constraint was the starting point, not an optimisation: study notes are among the most personal text a person writes, and sending them to a hosted API to get a quiz back is a bad trade.",
      ],
      problem: [
        "Re-reading notes feels productive and mostly is not. The learning-science result here is unusually robust: retrieval practice — being made to produce the answer — outperforms review, and spacing that practice out beats massing it. Almost no note-taking tool actually implements this.",
        "The obvious LLM version of this fails in a specific way. If you ask a model to quiz you on a topic and then grade you, it grades against its own pretrained knowledge of the topic, not against what you wrote. You get confidently marked wrong for omitting something that was never in your notes, and marked right for things your notes contradict.",
      ],
      architecture: [
        "Ingestion walks the vault, parses each Markdown file, and splits on heading boundaries rather than a fixed token count. A chunk is therefore a semantically complete unit — a section with its own heading — which is what makes single-chunk question generation coherent.",
        "The critical design property is that the source chunk is carried through the entire cycle. It is in the prompt at generation time, stored alongside the question, and passed back in at grading time. The model is never asked to recall the material; it is asked to compare two texts that are both in front of it.",
        "Results append to a local metrics store keyed by note and topic, which is what makes weak-area targeting possible on later sessions.",
      ],
      implementation: [
        "Question generation is scoped to exactly one chunk per call. Broader context produced questions that spanned notes in ways the grader could not then fairly assess.",
        "Grading uses a structured output contract rather than free prose: a verdict, the specific points recalled, the specific points missed, and a pointer back into the source text. Structure is what makes the feedback actionable and the metrics computable.",
        "Sessions are plain files on disk. There is no database because there is no concurrency, no multi-user access and no query pattern that a file cannot serve.",
      ],
      decisions: [
        {
          decision: "Local inference via Ollama, with no hosted fallback.",
          rationale:
            "A privacy guarantee with an exception is not a privacy guarantee. Removing the remote path entirely means there is no configuration mistake that can leak the vault.",
        },
        {
          decision: "Heading-based chunking instead of fixed-size windows.",
          rationale:
            "Fixed windows cut mid-argument and produce questions about fragments. Headings are an authoring signal that the writer already placed — using them costs nothing and respects the structure of the note.",
        },
        {
          decision: "The source chunk is passed back in at grading time.",
          rationale:
            "This is the single decision that makes feedback trustworthy. It converts grading from a recall task, where the model's priors dominate, into a comparison task over text it can see.",
        },
        {
          decision: "Structured grading output rather than free-form prose.",
          rationale:
            "Prose feedback reads well and cannot be aggregated. Structured fields give the learner specifics and give the metrics store something to count.",
        },
        {
          decision: "Files on disk instead of SQLite.",
          rationale:
            "One user, one machine, append-mostly access. A database would add a schema to migrate and a dependency to install in exchange for query capability nothing uses yet.",
        },
      ],
      tradeOffs: [
        {
          chose: "A small local model",
          over: "A frontier hosted model",
          because:
            "Privacy and zero marginal cost per question. The cost is real: question quality is measurably below what a frontier model produces, and grounding the grader is partly what compensates for it.",
        },
        {
          chose: "Single-chunk scope for question generation",
          over: "Vault-wide RAG retrieval",
          because:
            "It keeps every question gradable against a known source. The cost is that the system cannot ask synthesis questions that span several notes — which is exactly the kind of question worth asking later.",
        },
        {
          chose: "Free-recall answers",
          over: "Multiple choice",
          because:
            "Recognition is a much weaker test than production, and the retrieval-practice effect largely depends on production. The cost is that grading free text is hard, which is why the grounding work mattered.",
        },
      ],
      challenges: [
        "Early versions produced questions answerable from the heading alone. Constraining generation to ask about the body of the chunk, not its title, fixed most of it.",
        "Small models drift toward generic praise when grading. Requiring an explicit list of missed points, and requiring each to cite the source text, made the grader specific.",
        "Vault structure is idiosyncratic — daily notes, literature notes and reference notes are not equally quizzable. Ingestion needed an exclusion mechanism rather than assuming every file is study material.",
        "Markdown is not one format. Callouts, embeds, frontmatter and wiki links all needed handling before chunks read as clean prose to the model.",
      ],
      learned: [
        "Grounding is a systems decision, not a prompt. No amount of instructing a model to 'only use the provided text' substitutes for controlling what text is actually in the context at each step.",
        "Learning science gives you design constraints that are cheap to honour and expensive to discover independently — spacing, retrieval practice, and feedback specificity all changed the architecture.",
        "Local-first forces honesty about model capability. You cannot paper over a weak model with a bigger one, so the surrounding system has to carry more weight.",
        "Structured output is worth the constraint. It is what turned a chat toy into something that produces a measurable signal over weeks.",
      ],
      future: [
        "A proper spaced-repetition scheduler driven by the recall history rather than session-local ordering.",
        "Cross-note synthesis questions, with retrieval over several chunks and a grader grounded in all of them.",
        "An Obsidian plugin so the loop runs inside the editor instead of a separate CLI.",
        "Calibration: tracking how confident the learner felt against how they actually scored.",
      ],
    },
  },
  {
    slug: "softcart",
    name: "SoftCart",
    subtitle: "End-to-End Ecommerce Data Platform",
    summary:
      "A full ecommerce data platform: synthetic source systems, ETL into a dimensional model, and a Text-to-SQL layer whose safety is enforced by code rather than by the model.",
    period: "2025",
    domain: "Data Platform",
    featured: true,
    stack: [
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "DuckDB",
      "Airflow",
      "Docker",
      "FastAPI",
      "Streamlit",
      "Ollama",
    ],
    highlights: [
      "MySQL (OLTP) and MongoDB (catalog) unified into a DuckDB Kimball star schema.",
      "Text-to-SQL guarded by a layered deterministic safety validator.",
      "Two blocking Airflow data-quality gates that fail the run via pytest.",
      "Docker Compose cut contributor setup from ~2 hours to under 10 minutes.",
    ],
    links: { github: gh("SoftCart") },
    diagram: {
      caption: "Source systems through to natural-language analytics.",
      stages: [
        { nodes: [{ label: "Synthetic Data Generation", detail: "Faker · referentially consistent", tone: "source" }] },
        {
          nodes: [
            { label: "MongoDB", detail: "product catalogue (document)", tone: "storage" },
            { label: "MySQL", detail: "transactions (relational)", tone: "storage" },
          ],
          note: "Two shapes on purpose — the extract layer has to handle both.",
        },
        { nodes: [{ label: "ETL", detail: "Python · SQLAlchemy · Airflow", tone: "process" }] },
        { nodes: [{ label: "PostgreSQL Staging", detail: "raw, typed, idempotent loads", tone: "storage" }] },
        {
          nodes: [{ label: "Dimensional Model", detail: "star schema · SCD dimensions", tone: "storage" }],
          note: "Conformed dimensions are what let facts from different sources be compared.",
        },
        { nodes: [{ label: "Analytics", detail: "FastAPI · Streamlit · Plotly", tone: "serve" }] },
        {
          nodes: [{ label: "AI-Assisted Querying", detail: "Ollama → SQL → safety gate", tone: "ai" }],
          note: "The model proposes SQL. It never gets to execute it directly.",
        },
      ],
    },
    caseStudy: {
      overview: [
        "SoftCart is an end-to-end ecommerce data platform built to exercise the full path: generate realistic source data, land it in two deliberately different databases, move it through ETL into a dimensional model, and expose it for analysis — including in natural language.",
        "The most interesting part of the system is not the pipeline. It is the layer between an LLM that writes SQL and a database that executes it.",
      ],
      problem: [
        "Ecommerce data arrives in incompatible shapes. Product catalogues are nested and irregular, which suits a document store; orders and payments are relational and want constraints. Analytics needs them joined, consistently, with history preserved.",
        "The Text-to-SQL problem is a security problem wearing an analytics costume. An LLM that can turn a question into SQL can also turn a prompt injection into a DELETE. Prompting the model to 'only generate SELECT statements' is a request, not a control — and the failure mode is data loss.",
      ],
      architecture: [
        "Python and Faker generate synthetic but internally consistent data: users, a product catalogue, orders that reference real products, and payments that reference real orders. Referential integrity in the generator matters because it is what makes the downstream joins meaningful.",
        "Catalogue documents land in MongoDB and transactional records in MySQL. Airflow orchestrates extraction from both into a PostgreSQL staging layer, where everything is typed and loads are idempotent, then transforms staging into a DuckDB Kimball star schema: two fact tables at the order-item grain and seven conformed dimensions with surrogate keys.",
        "A FastAPI analytics API serves a Streamlit and Plotly dashboard, with Loguru structured logging throughout. The natural-language endpoint calls a local Qwen model via Ollama to draft SQL, then hands that SQL to a validation gate that decides whether it runs at all.",
      ],
      implementation: [
        "Airflow runs the pipeline as discrete generation, ingestion, staging and transformation services, with per-task retries and two blocking data-quality gates. The gates assert accuracy, completeness, consistency, timeliness and uniqueness through a pytest suite that fails the run on violation.",
        "Dimensions that change meaningfully over time are tracked as slowly changing dimensions, so an order joined to a product reflects the product as it was when the order was placed, not as it is today.",
        "SQLAlchemy Core is used rather than the ORM. The work here is bulk movement and explicit SQL, which is precisely where an ORM's object identity map is overhead rather than help.",
      ],
      guardrails: {
        title: "Text-to-SQL safety layer",
        principle:
          "Models can generate queries, but deterministic code enforces execution safety.",
        rules: [
          {
            rule: "SELECT-only enforcement",
            detail: "The parsed statement type must be SELECT. Anything else is rejected before it reaches a driver.",
          },
          {
            rule: "Single-statement validation",
            detail: "Exactly one statement per request, which removes stacked-query injection as a category.",
          },
          {
            rule: "Keyword denylist",
            detail: "DROP, DELETE, UPDATE, INSERT, ALTER, GRANT, COPY and friends are rejected on sight.",
          },
          {
            rule: "Table allowlist",
            detail: "Only analytics tables are reachable. System catalogues and anything outside the model are not.",
          },
          {
            rule: "Automatic LIMIT",
            detail: "A bound is injected when the query has none, so an unqualified scan cannot exhaust memory.",
          },
          {
            rule: "Read-only credentials",
            detail: "The execution role has no write grants. Even a bypass of every check above cannot mutate data.",
          },
          {
            rule: "Query timeout",
            detail: "A statement timeout caps damage from an accidental cross join.",
          },
          {
            rule: "pytest security suite",
            detail: "Each control has tests, including adversarial prompts that try to talk the model past it.",
          },
        ],
      },
      decisions: [
        {
          decision: "Two different source databases rather than one.",
          rationale:
            "A platform that only reads from Postgres never has to solve type coercion, schema drift or extract semantics across engines. The heterogeneity is where the actual engineering is.",
        },
        {
          decision: "Validation by parsing, not by regex.",
          rationale:
            "Regex-based SQL filtering is defeated by comments, casing, whitespace and string literals. Parsing the statement and inspecting its type is the difference between a speed bump and a control.",
        },
        {
          decision: "Defence in depth, with read-only credentials as the floor.",
          rationale:
            "Every application-layer check is code I could have got wrong. A database role with no write grants is enforced by the database, and is the layer I trust most precisely because it is not mine.",
        },
        {
          decision: "A star schema rather than querying normalised tables directly.",
          rationale:
            "Analytical queries and text-to-SQL both get dramatically easier when joins are shallow and predictable. It also narrows the surface the model has to reason about.",
        },
        {
          decision: "Security controls covered by automated tests.",
          rationale:
            "A guardrail without a test is an intention. The suite includes injection attempts so a regression fails CI rather than surfacing in production.",
        },
      ],
      tradeOffs: [
        {
          chose: "A restrictive allowlist",
          over: "A permissive denylist",
          because:
            "Denylists fail open — anything you did not think of is permitted. Allowlists fail closed. The cost is ongoing maintenance whenever a legitimate new table needs exposing, which is the right direction to be wrong in.",
        },
        {
          chose: "A local model for SQL generation",
          over: "A hosted frontier model",
          because:
            "Schema metadata is business-sensitive and this keeps it in-process. The cost is lower generation quality on complex analytical questions, which the star schema partly offsets by simplifying the joins.",
        },
        {
          chose: "Airflow",
          over: "Cron plus scripts",
          because:
            "Dependencies, retries, backfills and run visibility are exactly what this pipeline needs and exactly what Airflow provides. The cost is real operational weight — for a strictly linear daily job, cron would have been the honest answer.",
        },
        {
          chose: "SCD tracking on key dimensions",
          over: "Overwriting dimension rows",
          because:
            "Historical accuracy in reporting. The cost is more complex joins and a larger dimension table, paid on every query to preserve a property that is impossible to reconstruct later.",
        },
      ],
      challenges: [
        "MongoDB documents with irregular nesting did not flatten cleanly. The extract layer needed an explicit projection per collection rather than a generic flattener that quietly dropped fields.",
        "Timezone handling across MySQL, MongoDB and Postgres produced off-by-one-day bugs in daily aggregates. Normalising to UTC at the ingestion boundary was the only version that stayed correct.",
        "The model occasionally produced valid SQL that was semantically wrong — joining on the wrong key, or double-counting across a fan-out join. Safety controls do not catch this, which is why the interface shows the generated SQL rather than only the result.",
        "Getting Docker Compose to bring up four services with correct startup ordering needed real health checks; depends_on alone does not wait for a database to be ready to accept connections.",
      ],
      learned: [
        "The security boundary belongs at execution, not generation. Once I stopped trying to make the model behave and started constraining what its output was allowed to do, the problem became tractable.",
        "Showing the generated SQL is a feature. It is the only thing that lets a user catch a semantically wrong query that passed every safety check.",
        "Dimensional modelling earns its reputation. Explicit facts and conformed dimensions make both human and machine query-writing simpler.",
        "Writing the adversarial tests taught me more about the system's weaknesses than writing the controls did.",
      ],
      future: [
        "Query cost estimation before execution, rejecting plans above a threshold.",
        "A semantic layer so common metrics have one definition instead of being re-derived per query.",
        "Row-level security so the same interface can serve users with different data access.",
        "dbt for the staging-to-mart transformations, to get lineage and tests declaratively.",
      ],
    },
  },
  {
    slug: "youtube-pipeline",
    name: "YouTube Trending Data Pipeline",
    subtitle: "AWS Serverless Data Pipeline",
    summary:
      "A serverless medallion pipeline on AWS: raw JSON and CSV through Glue PySpark into partitioned Parquet, with a data-quality gate that stops bad data before it reaches the Gold layer.",
    period: "2025",
    domain: "Data Engineering",
    featured: true,
    stack: [
      "AWS S3",
      "AWS Glue",
      "PySpark",
      "AWS Lambda",
      "Step Functions",
      "EventBridge",
      "CloudWatch",
      "SNS",
      "Athena",
      "QuickSight",
      "Boto3",
    ],
    highlights: [
      "Bronze → Silver → Gold on Snappy Parquet, partitioned across 10 regions.",
      "Two quality gates that halt Gold promotion rather than publishing bad data.",
      "Serverless throughout: 6-hour EventBridge schedule, Step Functions, SNS alerts.",
      "QuickSight dashboard over four Athena SPICE datasets.",
    ],
    links: { github: gh("youtube-trending-pipeline") },
    diagram: {
      caption: "Medallion layers on S3, orchestrated by Step Functions.",
      stages: [
        { nodes: [{ label: "Raw Data", detail: "YouTube API v3 · 10 regions · Kaggle history", tone: "source" }] },
        {
          lane: "Bronze",
          nodes: [{ label: "S3 Bronze", detail: "immutable landing zone", tone: "storage" }],
          note: "Never rewritten. Every downstream layer is reproducible from here.",
        },
        { nodes: [{ label: "Glue PySpark", detail: "normalise · type · deduplicate", tone: "process" }] },
        {
          lane: "Silver",
          nodes: [{ label: "S3 Silver", detail: "Parquet · Snappy · partitioned by region", tone: "storage" }],
        },
        {
          nodes: [{ label: "Quality Gate", detail: "row floors · nulls · schema · 48h freshness", tone: "quality" }],
          note: "Fails the state machine and publishes to SNS. Gold is not written on failure.",
        },
        {
          lane: "Gold",
          nodes: [{ label: "Gold Aggregations", detail: "3 region-partitioned tables", tone: "storage" }],
        },
        {
          nodes: [
            { label: "Athena", detail: "SQL over the Glue Catalog", tone: "serve" },
            { label: "QuickSight", detail: "4 SPICE datasets · daily refresh", tone: "serve" },
          ],
        },
      ],
    },
    caseStudy: {
      overview: [
        "A serverless pipeline that ingests YouTube Data API v3 trending data across 10 regions, alongside historical Kaggle datasets, and turns it into queryable analytics — a medallion architecture on S3 with Glue PySpark doing the transformation, Athena querying it and QuickSight serving the dashboard.",
        "The design goal was operational rather than analytical: no servers to patch, no cluster idling overnight, and a failure path that notifies instead of silently publishing wrong numbers.",
      ],
      problem: [
        "The source data is awkward in an instructive way. Trending files arrive per region with inconsistent schemas, category identifiers that resolve through a separate JSON file, mixed encodings, and duplicate rows when a video trends on consecutive days.",
        "Loaded naively, all of that lands in the analytics layer. Category IDs that do not resolve become nulls, duplicates inflate view counts, and encoding problems corrupt titles — and none of it is visible until somebody queries it and the numbers look wrong.",
      ],
      architecture: [
        "Bronze is the immutable landing zone: raw files, exactly as received, partitioned by ingestion date and never rewritten. This is what makes the rest of the pipeline reproducible — any Silver or Gold bug is fixed by changing the transform and replaying.",
        "Glue PySpark reads Bronze, normalises schemas across regions, resolves category IDs, deduplicates on video and trending date, and writes Silver as Snappy-compressed Parquet partitioned by region.",
        "Quality is enforced at two boundaries: a pre-ingestion Lambda, and a pre-Gold gate as its own Step Functions state. The gate validates row-count floors, null thresholds on critical columns, schema conformance and 48-hour freshness. On failure the state machine halts Gold promotion and SNS sends an alert — Gold is simply not written.",
        "EventBridge triggers the pipeline on a 6-hour schedule with parallel Silver transformations, CloudWatch captures logs and metrics, and the Glue Catalog exposes every layer to Athena. S3, Glue, Lambda and Step Functions resources are all provisioned programmatically with Boto3 rather than clicked together in the console.",
      ],
      implementation: [
        "Parquet with Snappy was the format decision. Columnar storage means an Athena query touching three columns reads three columns, and Snappy is the right point on the compression-versus-CPU curve for a format that will be read far more often than written.",
        "Region partitioning matches the dominant query pattern — most analysis is per-region or a small set of regions — so partition pruning eliminates most of the scan, which is what Athena actually bills for.",
        "Retries are three-attempt with exponential backoff, configured per state and scoped to transient errors. A schema violation retried three times is three times the cost and the same failure, so those fail fast instead.",
        "Gold materialises three region-partitioned tables carrying the engagement metrics that would otherwise be recomputed on every dashboard load. QuickSight reads them through four Athena SPICE datasets on a scheduled daily refresh, answering questions on regional targeting, category momentum, channel partner consistency and publish timing.",
      ],
      decisions: [
        {
          decision: "Medallion layering with an immutable Bronze.",
          rationale:
            "Separating 'what arrived' from 'what we made of it' means transformation bugs are recoverable. Without it, a bad transform over raw data is unrecoverable data loss.",
        },
        {
          decision: "The quality gate is a pipeline state, not a post-hoc report.",
          rationale:
            "A dashboard that tells you yesterday's aggregates were wrong is strictly worse than a pipeline that refuses to publish them. Failing closed keeps bad data out of the layer people trust.",
        },
        {
          decision: "Partition by region rather than by date alone.",
          rationale:
            "Partitioning should follow the predicate people actually write. Region is in nearly every query here; date partitioning alone would have left full-region scans on the table.",
        },
        {
          decision: "Serverless Glue rather than a managed EMR cluster.",
          rationale:
            "The workload is a scheduled batch measured in minutes. Paying for a cluster between runs, and for the operational attention it needs, buys nothing at this data volume.",
        },
        {
          decision: "Step Functions rather than chaining Lambdas or Glue triggers.",
          rationale:
            "Explicit state, visual execution history, and per-state retry policy. When a run fails at 3am, the execution graph tells you which state and why without reading logs.",
        },
      ],
      tradeOffs: [
        {
          chose: "Serverless Glue",
          over: "A persistent EMR cluster",
          because:
            "No idle cost and no cluster operations. The cost is cold-start latency per job and less control over Spark tuning — both irrelevant for a scheduled batch, both blocking if this became near-real-time.",
        },
        {
          chose: "Failing the run on a quality breach",
          over: "Publishing with a warning",
          because:
            "Stale-but-correct beats fresh-but-wrong for analytics people act on. The cost is that a false positive in the quality check delays good data, so the thresholds have to be tuned honestly rather than set tight.",
        },
        {
          chose: "Pre-aggregated Gold tables",
          over: "Querying Silver directly",
          because:
            "Predictable query cost and latency for the common questions. The cost is storage duplication and a pipeline step to maintain — worth it because the aggregation set is small and stable.",
        },
        {
          chose: "Athena",
          over: "Loading into Redshift",
          because:
            "Query-volume here is low and bursty, which is exactly the shape where per-query pricing wins over a provisioned warehouse. At sustained high concurrency the calculation reverses.",
        },
      ],
      challenges: [
        "Regional CSV files used different encodings, and Spark's default read silently mangled non-ASCII titles. Explicit encoding per source was the fix; detecting it was the hard part, because corrupted text does not raise an error.",
        "Deduplication needed a definition, not a function. A video trending on three consecutive days is three legitimate rows, not duplicates — the key is video plus trending date, and getting that wrong changed every aggregate.",
        "Small-file proliferation in Silver hurt Athena performance badly. Coalescing partitions before write turned thousands of tiny objects into a manageable number.",
        "Glue job IAM permissions failed in ways that surfaced as opaque runtime errors rather than clear authorisation failures, which made the first few debugging cycles slower than they should have been.",
      ],
      learned: [
        "Immutability at the landing zone is the cheapest insurance in data engineering. It costs storage and buys the ability to fix any downstream mistake.",
        "Partitioning is a query-pattern decision, not a data-shape decision. Partitioning by what is convenient to write rather than what people filter on is a common and expensive mistake.",
        "A quality gate changes the failure mode from 'wrong numbers, discovered late' to 'no numbers, discovered immediately'. The second is far easier to operate.",
        "Serverless removes server operations, not operations. IAM, cold starts, quotas and per-service limits are the new surface.",
      ],
      future: [
        "Great Expectations for declarative quality rules instead of hand-written checks.",
        "Iceberg tables for schema evolution and time travel over the current Parquet layout.",
        "Incremental processing so a run touches only new partitions rather than reprocessing.",
        "Cost attribution per run, surfaced next to the execution history.",
      ],
    },
  },
  {
    slug: "ridestream",
    name: "RideStream",
    subtitle: "Real-Time Ride Analytics Lakehouse",
    summary:
      "A streaming lakehouse for ride events: Kafka on MSK into S3 via Firehose, Spark on EMR for curation, dbt for modelling, Athena for analytics — with the whole stack defined in CloudFormation.",
    period: "2025",
    domain: "Streaming",
    featured: true,
    stack: [
      "Kafka",
      "Amazon MSK",
      "Kinesis Firehose",
      "S3",
      "AWS Glue",
      "EMR",
      "Spark",
      "Step Functions",
      "dbt",
      "Athena",
      "CloudFormation",
    ],
    highlights: [
      "Streaming ingestion decoupled from batch curation by an S3 landing zone.",
      "dbt models with tests provide lineage and assertions over the curated layer.",
      "Entire stack reproducible from CloudFormation templates.",
    ],
    links: { github: gh("RideStream") },
    diagram: {
      caption: "Streaming ingestion, batch curation, modelled analytics.",
      stages: [
        { nodes: [{ label: "Ride Events", detail: "trip · driver · payment", tone: "source" }] },
        {
          nodes: [{ label: "Kafka on Amazon MSK", detail: "partitioned, replayable log", tone: "ingest" }],
          note: "The buffer that lets producers and consumers fail independently.",
        },
        { nodes: [{ label: "Kinesis Firehose", detail: "buffered delivery to S3", tone: "ingest" }] },
        { nodes: [{ label: "S3 Raw Zone", detail: "partitioned by event date", tone: "storage" }] },
        {
          nodes: [
            { label: "Glue Catalog", detail: "schema registry", tone: "process" },
            { label: "EMR Spark", detail: "dedupe · sessionise · enrich", tone: "process" },
          ],
          note: "Orchestrated by Step Functions on a schedule.",
        },
        { nodes: [{ label: "Curated Lakehouse", detail: "Parquet, partitioned, catalogued", tone: "storage" }] },
        {
          nodes: [{ label: "dbt Models", detail: "staging → marts, with tests", tone: "quality" }],
        },
        { nodes: [{ label: "Athena", detail: "analyst-facing SQL", tone: "serve" }] },
      ],
    },
    caseStudy: {
      overview: [
        "RideStream models the data platform behind a ride-hailing service: continuously arriving trip, driver and payment events that need to land reliably, be curated into a usable shape, and be modelled for analysis.",
        "It is deliberately a streaming ingestion path feeding a batch curation path, rather than end-to-end streaming — a structure that matches how most 'real-time' analytics platforms actually work once you look at their freshness requirements honestly.",
      ],
      problem: [
        "Ride events arrive continuously, out of order, and sometimes more than once. Producers retry on timeout, so duplicates are normal rather than exceptional. Trip events also span time: a trip has a start and an end, and the end can arrive well after the start.",
        "Analysts want SQL over clean, modelled tables. Bridging those two facts — an unbounded, duplicate-prone, out-of-order event stream on one side and a stable star-shaped warehouse on the other — is the whole problem.",
      ],
      architecture: [
        "Producers write to Kafka topics on Amazon MSK, partitioned by trip identifier so that all events for a trip land on the same partition and arrive in order relative to each other. The log is the decoupling point: a downstream outage does not lose events, and a consumer bug can be fixed and replayed.",
        "Kinesis Firehose consumes from Kafka and buffers into S3, converting to Parquet on the way and partitioning by event date. This is the boundary between streaming and batch — everything upstream is per-event, everything downstream is per-partition.",
        "Step Functions triggers EMR Spark jobs that deduplicate on event key, sessionise trip events into complete trips, and enrich with driver and vehicle reference data. Output is the curated lakehouse layer, registered in the Glue Catalog.",
        "dbt models sit on top, building staging and mart layers with schema tests and referential assertions. Athena serves the result. CloudFormation defines all of it.",
      ],
      implementation: [
        "Partitioning by trip id is the decision that makes correctness tractable. Kafka only guarantees ordering within a partition, so co-locating a trip's events is what allows sessionisation to assume ordered input per key.",
        "Deduplication uses event id with a bounded look-back window rather than an unbounded state store, which keeps job memory predictable at the cost of not catching a duplicate that arrives days late.",
        "Firehose buffer settings are a direct latency-versus-file-size trade. Buffering longer produces fewer, larger Parquet files that Athena reads far more efficiently; buffering shorter reduces end-to-end lag. Tuned toward file size, because the freshness requirement here is minutes rather than seconds.",
        "dbt tests run as part of the pipeline, so a referential break fails the run rather than surfacing in a dashboard.",
      ],
      decisions: [
        {
          decision: "Streaming ingestion with batch curation, not end-to-end streaming.",
          rationale:
            "Streaming joins, watermarks and late-arrival handling are a substantial complexity budget. The analytics here need minute-level freshness, which batch curation over a streaming landing zone delivers at a fraction of the operational cost.",
        },
        {
          decision: "Kafka as a buffer rather than writing directly to S3.",
          rationale:
            "Replay. Kafka's retained log means a consumer bug is recoverable by resetting an offset. Direct-to-S3 writes make the producer responsible for durability and retries, and lose the ability to reprocess.",
        },
        {
          decision: "Partition Kafka topics by trip id.",
          rationale:
            "It converts a global ordering problem into a per-key ordering problem, which Kafka already guarantees. Sessionisation then works on ordered input without a sort.",
        },
        {
          decision: "dbt for the modelling layer rather than more Spark.",
          rationale:
            "The transformations from curated to mart are SQL-shaped. dbt gives lineage, tests and documentation for free, and puts that layer within reach of analysts rather than only Spark engineers.",
        },
        {
          decision: "CloudFormation for the whole stack.",
          rationale:
            "MSK, Firehose, EMR, Step Functions and IAM have too many interdependent settings to reproduce by hand. Infrastructure as code is what makes the environment rebuildable and the configuration reviewable.",
        },
      ],
      tradeOffs: [
        {
          chose: "Micro-batch curation",
          over: "Spark Structured Streaming end to end",
          because:
            "Far simpler failure semantics and no long-lived cluster state. The cost is a latency floor set by the batch interval, which rules this design out if sub-second freshness ever becomes a requirement.",
        },
        {
          chose: "Larger Firehose buffers",
          over: "Minimal delivery latency",
          because:
            "Small files are the dominant performance problem in a lakehouse, and Athena costs scale with data scanned. The cost is additional minutes of end-to-end lag.",
        },
        {
          chose: "Bounded-window deduplication",
          over: "An exactly-once state store",
          because:
            "Predictable memory and a much simpler job. The cost is that duplicates arriving outside the window survive — acceptable when producer retries happen within seconds.",
        },
        {
          chose: "EMR",
          over: "Serverless Glue",
          because:
            "Sessionisation over large windows benefits from Spark tuning and instance choice that Glue does not expose. The cost is cluster lifecycle management, which Step Functions handles by creating and terminating per run.",
        },
      ],
      challenges: [
        "Late-arriving trip-end events broke sessionisation when a trip spanned a partition boundary. Handling it required processing a look-back window rather than only the current partition.",
        "MSK and Firehose networking — VPC configuration, security groups and IAM — took longer to get right than the data logic did, and failed with errors that pointed at the wrong layer.",
        "EMR cluster sizing was initially guesswork. Profiling the actual shuffle volume rather than estimating from input size was what made the sizing defensible.",
        "Schema evolution in the event stream broke downstream Spark jobs. Registering schemas in the Glue Catalog and reading defensively, rather than assuming a fixed shape, made producer changes non-breaking.",
      ],
      learned: [
        "'Real-time' is a requirement worth interrogating. Most stakeholders asking for it need minutes, and the architecture that delivers minutes is dramatically cheaper to build and run than the one that delivers milliseconds.",
        "The replayable log is the feature. Kafka's value here was not throughput — it was being able to reprocess after fixing a consumer bug.",
        "File size is a first-class performance concern in a lakehouse. It is invisible in development and dominant in production.",
        "Infrastructure as code stops being optional once a stack has this many interdependent services; the manual version is not reproducible even by the person who built it.",
      ],
      future: [
        "Iceberg for the curated layer, for schema evolution and snapshot isolation.",
        "A streaming path in parallel for the small set of genuinely latency-sensitive metrics.",
        "Data contracts between producers and the platform, validated at the Kafka boundary.",
        "Cost and freshness SLOs surfaced as monitored metrics rather than assumptions.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
