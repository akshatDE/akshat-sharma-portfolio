/**
 * Single source of truth for identity, contact links and site-wide metadata.
 *
 * `siteUrl` is the one value still to set: point it at your production domain
 * before deploying, since it drives canonical URLs, sitemap.xml and robots.txt.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Icon name resolved in components/ui/social-icon.tsx */
  icon: "github" | "linkedin" | "mail";
}

export const profile = {
  name: "Akshat Sharma",
  /** Rendered as the hero's second line. */
  title: "Data Engineer × AI Engineer",
  /** Used in <title> templates and structured data. */
  role: "Data Engineer & AI Engineer",
  location: "Boston, MA",

  /** Hero paragraph. Kept in data so the copy is editable without touching JSX. */
  intro:
    "I build data platforms, AI systems, and agentic applications with an emphasis on reliable architecture, production engineering, and understanding systems from first principles.",

  /** One-sentence description reused across SEO metadata. */
  description:
    "Data Engineer and AI Engineer building production data platforms, agentic AI systems, MCP integrations, and open-source software.",

  /** No trailing slash. Update to your real domain before deploying. */
  siteUrl: "https://akshatsharma.dev",

  /** Path inside /public. Replace the file, keep the path. */
  resumePath: "/resume.pdf",

  /** Short availability line shown in the hero. Set to null to hide it. */
  status: "Open to Data Engineering and AI Engineering roles" as string | null,

  email: "sharmaakshat0001@gmail.com",

  social: {
    github: "https://github.com/akshatDE",
    linkedin: "https://linkedin.com/in/akshat-sharma-35a514222/",
  },
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.social.github, icon: "github" },
  { label: "LinkedIn", href: profile.social.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];
