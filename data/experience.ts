export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  /** Short framing line shown above the bullets. */
  summary: string;
  /** Impact-first bullets. Lead with the outcome, then the mechanism. */
  highlights: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  /** Path under /public. Square mark with its own background. */
  logo?: string;
  degree: string;
  focus?: string;
  period?: string;
  /** GPA or similar, rendered as small monospace metadata. */
  detail?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

/** Roles outside salaried work — campus programmes, community, advocacy. */
export interface OutsideRole {
  organization: string;
  title: string;
  affiliation: string;
  /** Optional: set once you know the term dates. */
  period?: string;
  summary: string;
  highlights: string[];
  url?: string;
}

export const experience: Role[] = [
  {
    company: "Neel Data Pro IT Solutions Pvt Ltd",
    title: "Data Engineer · Data Engineering Intern",
    start: "July 2021",
    end: "July 2024",
    location: "Greater Noida, India",
    summary:
      "Owned the tourism reporting pipeline end to end — ingestion, modelling, delivery scheduling, failure triage and reprocessing — for analytics consumed by government stakeholders.",
    highlights: [
      "Engineered ETL pipelines in Python and SQL processing 2.5 GB of daily tourism data, consolidating 6+ source systems into Google BigQuery and cutting report generation from 4 hours to 30 minutes for 15+ government stakeholders.",
      "Migrated 10M+ records from legacy systems into BigQuery, standardised metadata fields and reconciled row counts against sources to confirm zero data loss at cutover.",
      "Implemented validation at load boundaries — row counts, null thresholds, schema conformance and referential integrity — catching defects before they reached stakeholder reports.",
      "Partnered with 3 cross-functional teams to resolve production bottlenecks, improving data integrity ~25% and cutting report discrepancies 30%.",
      "Analysed 500K+ records in Python and pandas and built 8+ Tableau dashboards tracking segment KPIs, informing 4 strategic funding decisions and raising stakeholder engagement 40%.",
      "Authored pipeline runbooks and a data dictionary for the warehouse schema, establishing documented governance that let analysts self-serve on schema questions.",
    ],
    stack: [
      "Python",
      "SQL",
      "BigQuery",
      "pandas",
      "Tableau",
      "ETL / ELT",
      "Data quality",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "University of Massachusetts Boston",
    logo: "/images/umass-boston.png",
    degree: "M.S. Business Analytics",
    focus: "AI and Data Analytics",
    period: "September 2024 — May 2026",
    detail: "GPA 4.0",
  },
  {
    institution: "Chitkara University",
    logo: "/images/chitkara.png",
    degree: "B.Tech Computer Science Engineering",
    period: "August 2019 — August 2023",
    detail: "GPA 3.74",
  },
];

export const outsideExperience: OutsideRole[] = [
  {
    organization: "Perplexity AI",
    title: "Campus Strategist",
    affiliation: "University of Massachusetts Boston",
    period: "Spring 2025",
    summary:
      "Selected to represent Perplexity at UMass Boston, where I ran campus outreach for its student programme.",
    highlights: [
      "Student-facing point of contact for Perplexity on campus.",
      "Ran outreach across the university introducing students to real-time, source-backed AI research.",
      "Distributed complimentary Perplexity Pro access through the student programme.",
    ],
    url: "https://www.perplexity.ai",
  },
];

export const certifications: Certification[] = [
  {
    name: "IBM Data Engineering Professional Certificate",
    issuer: "Coursera",
  },
  { name: "Snowflake University Platform Skills Badge", issuer: "Snowflake" },
  { name: "AI Agents Fundamentals", issuer: "Hugging Face" },
];
