/**
 * Generates components/ui/tech-icons.ts from the simple-icons package.
 *
 * simple-icons is a devDependency and never ships: only the handful of paths
 * listed below are written into a plain TypeScript module, so the bundle
 * carries ~26 SVG paths instead of a 3,400-icon library.
 *
 * Run with: node scripts/generate-tech-icons.mjs
 */
import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

/** Display name (as it appears in data/skills.ts) → simple-icons export. */
const MAP = {
  Python: "siPython",
  PySpark: "siApachespark",
  Spark: "siApachespark",
  pandas: "siPandas",
  Bash: "siGnubash",
  BigQuery: "siGooglebigquery",
  Snowflake: "siSnowflake",
  Databricks: "siDatabricks",
  DuckDB: "siDuckdb",
  PostgreSQL: "siPostgresql",
  MySQL: "siMysql",
  MongoDB: "siMongodb",
  Airflow: "siApacheairflow",
  Kafka: "siApachekafka",
  LangChain: "siLangchain",
  LangGraph: "siLanggraph",
  Ollama: "siOllama",
  MCP: "siModelcontextprotocol",
  FastAPI: "siFastapi",
  SQLAlchemy: "siSqlalchemy",
  Docker: "siDocker",
  Git: "siGit",
  Linux: "siLinux",
  "Looker Studio": "siLooker",
  Streamlit: "siStreamlit",
  "Testing (pytest)": "siPytest",
  Perplexity: "siPerplexity",
  // Alias: the organisation is written in full on the Experience page.
  "Perplexity AI": "siPerplexity",
};

/** WCAG relative luminance, 0 (black) to 1 (white). */
function luminance(hex) {
  const c = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function mix(hex, target, amount) {
  const out = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(v + (target - v) * amount)
      .toString(16)
      .padStart(2, "0");
  });
  return out.join("");
}

/**
 * Brand colours are chosen for white marketing sites, so some are unreadable on
 * this site's dark background — Ollama's mark is #000000.
 *
 * Rather than a fixed nudge, this finds the *smallest* mix toward white that
 * clears a luminance floor, so the hue stays recognisable: Python blue stays
 * blue instead of washing out to near-white.
 */
function adjust(hex) {
  let amount = 0;
  let result = hex;
  while (amount <= 1) {
    result = mix(hex, 255, amount);
    if (luminance(result) >= DARK_FLOOR) break;
    amount += 0.02;
  }
  return result;
}

/** Minimum luminance to read on the dark background (#0a0a0c). */
const DARK_FLOOR = 0.3;

function themeColor(hex) {
  return luminance(hex) < DARK_FLOOR ? adjust(hex) : hex;
}

const entries = [];
const missing = [];

for (const [name, key] of Object.entries(MAP)) {
  const icon = si[key];
  if (!icon) {
    missing.push(`${name} (${key})`);
    continue;
  }
  entries.push({
    name,
    title: icon.title,
    path: icon.path,
    color: themeColor(icon.hex),
  });
}

if (missing.length) {
  console.error("Missing icons:", missing.join(", "));
  process.exit(1);
}

const body = entries
  .map(
    (e) =>
      `  ${JSON.stringify(normalize(e.name))}: {\n` +
      `    title: ${JSON.stringify(e.title)},\n` +
      `    color: "#${e.color}",\n` +
      `    path: ${JSON.stringify(e.path)},\n` +
      `  },`,
  )
  .join("\n");

function normalize(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const out = `// GENERATED FILE — do not edit by hand.
// Run \`npm run icons\` to regenerate from the simple-icons package.
//
// Only the marks actually used on the site are included. Colours are the
// official brand hex, lightened where the original would be unreadable on the
// dark background.

export interface TechIcon {
  title: string;
  /** Brand hex, lightened if it would disappear on the dark background. */
  color: string;
  /** SVG path data, viewBox "0 0 24 24". */
  path: string;
}

const icons: Record<string, TechIcon> = {
${body}
};

/** Looks up a mark by display name; returns undefined when there is no icon. */
export function techIcon(name: string): TechIcon | undefined {
  return icons[name.toLowerCase().replace(/[^a-z0-9]/g, "")];
}
`;

writeFileSync(new URL("../components/ui/tech-icons.ts", import.meta.url), out);
console.log(`Wrote ${entries.length} icons to components/ui/tech-icons.ts`);
