/**
 * Technical focus areas.
 *
 * Grouped into three domains with a short framing sentence each, so the section
 * reads as "here is how I think about this work" rather than a wall of logos.
 * Kept in sync with the skills block on the resume.
 */

export interface SkillGroup {
  id: string;
  title: string;
  /** One line explaining what this domain means in practice. */
  summary: string;
  icon: "database" | "brain" | "terminal";
  /** Named sub-groupings keep long lists scannable. */
  clusters: { label: string; items: string[] }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "data-engineering",
    title: "Data Engineering",
    summary:
      "Moving data reliably between systems, then modelling it so analysts and downstream services can trust the numbers.",
    icon: "database",
    clusters: [
      {
        label: "Languages & processing",
        items: ["Python", "SQL", "PySpark", "Spark", "pandas", "Bash"],
      },
      {
        label: "Warehouses & stores",
        items: [
          "BigQuery",
          "Snowflake",
          "Databricks",
          "DuckDB",
          "PostgreSQL",
          "MySQL",
          "MongoDB",
        ],
      },
      {
        label: "Orchestration & movement",
        items: ["Airflow", "Kafka", "dbt", "AWS", "Boto3", "ETL / ELT"],
      },
      {
        label: "Modelling & correctness",
        items: [
          "Kimball dimensional modelling",
          "Medallion architecture",
          "Lakehouse architecture",
          "Data quality testing",
          "Data governance",
        ],
      },
    ],
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    summary:
      "Treating an LLM as one component in a larger system — with explicit control flow, tool boundaries and deterministic guardrails around it.",
    icon: "brain",
    clusters: [
      {
        label: "Agents & protocols",
        items: ["Agentic AI", "MCP", "Tool calling", "LangChain", "LangGraph"],
      },
      {
        label: "Models & runtimes",
        items: ["LLMs", "Local LLMs", "Ollama", "Groq", "OpenAI API"],
      },
      {
        label: "Retrieval & context",
        items: [
          "RAG",
          "Vector databases (FAISS)",
          "Text-to-SQL",
          "Context engineering",
          "Prompt engineering",
        ],
      },
      {
        label: "Safety",
        items: ["AI safety", "Guardrails"],
      },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    summary:
      "The parts that decide whether a system survives contact with production: interfaces, packaging, tests and observability.",
    icon: "terminal",
    clusters: [
      {
        label: "Services & interfaces",
        items: ["Python", "FastAPI", "REST APIs", "SQLAlchemy"],
      },
      {
        label: "Platform",
        items: ["Docker", "Git", "Linux"],
      },
      {
        label: "BI & visualisation",
        items: ["Tableau", "Looker Studio", "QuickSight", "Streamlit"],
      },
      {
        label: "Practice",
        items: ["Testing (pytest)", "System design", "Observability"],
      },
    ],
  },
];
