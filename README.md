# Personal Portfolio — Akshat Sharma

A minimal, engineering-focused personal site built with Next.js (App Router),
TypeScript and Tailwind CSS. Every route is statically prerendered and ships
almost no client JavaScript.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (fails on type errors) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

---

## Before you deploy

One value is still a placeholder — `siteUrl` in [`data/profile.ts`](data/profile.ts).
Set it to your production domain; it drives canonical URLs, `sitemap.xml` and
`robots.txt`. Everything else (GitHub, LinkedIn, email, resume, LangChain PR
links) is populated from the real resume.

---

## Architecture

The guiding rule is **content is data, UI is components, and the two never mix**.

- **Server Components by default.** Four files carry `"use client"`: the theme
  provider, the theme toggle, the mobile menu and the nav link highlighter.
  Everything else — including syntax highlighting — runs at build time.
- **No backend.** No API routes, no database, no auth. There is nothing this
  site needs to do at request time, so every route is prerendered to static HTML.

### Why these dependencies

| Package | Problem it solves |
| --- | --- |
| `next`, `react` | App Router, Server Components |
| `tailwindcss` v4 | Styling, configured in CSS (no `tailwind.config.js`) |
| `lucide-react` | Icons, tree-shaken per import |
| `next-themes` | Writes the theme class before first paint — prevents the dark-mode flash |
| `geist` | Self-hosted variable font: no build-time network fetch, no layout shift |

Six runtime dependencies total. Deliberately **not** used: no state library, no
UI kit, no `clsx` + `tailwind-merge`, no MDX, no `@tailwindcss/typography`, no
diagram library. Architecture diagrams are plain DOM (see below).

---

## Folder structure

```
app/                      Routes. Each page is thin — it composes components.
  layout.tsx              Root layout, fonts, global metadata
  page.tsx                Home
  about/ experience/ open-source/ resume/
  projects/               Project index
    [slug]/               Case study template — one file, one page per project
  sitemap.ts robots.ts    Generated from the same data the pages use
  icon.svg                Favicon
  globals.css             Design tokens, light/dark palettes, base styles

components/
  layout/                 Header, footer, theme provider, nav
  ui/                     Primitives: Container, Section, Tag, ButtonLink…
  projects/               Project card, case-study sections, guardrail block
  architecture/           Architecture diagram system
  home/ about/            Page-specific sections

data/                     All structured content. No copy lives in components.
  profile.ts              Name, links, email, site URL, resume path
  navigation.ts           Nav items
  projects.ts             Projects + full case studies + diagrams
  experience.ts           Roles, education and certifications
  skills.ts               Technical focus areas
  open-source.ts          Contributions
  principles.ts           Engineering principles
  journey.ts              About-page progression

lib/
  types.ts                Shared domain types
  seo.ts                  Per-page metadata builder
  utils.ts                cn(), formatDate()

public/
  resume.pdf              Replace this file to update the resume
  images/
    akshat-sharma.jpg     Hero portrait
```

### Why projects are TypeScript, not Markdown

A case study is *structured*: every one has the same nine sections plus a typed
architecture diagram. Encoding that as TypeScript means the compiler catches a
missing section, and the diagram renders as real DOM instead of an image.

---

## Managing content

### Adding a project

1. Append an object to the `projects` array in [`data/projects.ts`](data/projects.ts).
   TypeScript will tell you exactly what is missing.
2. The route `/projects/<slug>`, the index page, the home page grid and the
   sitemap all pick it up automatically. **No component changes.**

Set `featured: true` to include it on the home page.

The `diagram` field builds the architecture diagram:

```ts
diagram: {
  caption: "Optional line under the diagram.",
  stages: [
    { nodes: [{ label: "Raw Data", detail: "JSON + CSV", tone: "source" }] },
    {
      lane: "Bronze",                       // optional label in the left gutter
      nodes: [{ label: "S3", tone: "storage" }],
      note: "Optional annotation under the stage.",
    },
    {
      // Several nodes in one stage render side by side.
      nodes: [
        { label: "MongoDB", tone: "storage" },
        { label: "MySQL", tone: "storage" },
      ],
    },
  ],
}
```

`tone` is one of `source | ingest | process | storage | quality | serve | ai`
and only colours a small dot, which is what keeps a seven-stage diagram from
turning into a rainbow flowchart.

Add the optional `caseStudy.guardrails` block for a deterministic safety layer —
SoftCart uses it.

### Changing the resume

Replace `public/resume.pdf`. That is the whole process.

The path is declared once as `resumePath` in [`data/profile.ts`](data/profile.ts)
and used by every link — the nav, the Open PDF button and the Download button.
To use a different filename, change it in that one place.

### Editing everything else

| To change | Edit |
| --- | --- |
| Name, tagline, intro, links, availability | `data/profile.ts` |
| Nav items | `data/navigation.ts` |
| Jobs and education | `data/experience.ts` |
| Technical focus areas | `data/skills.ts` |
| Open-source contributions | `data/open-source.ts` |
| Engineering principles | `data/principles.ts` |
| About-page story | `data/journey.ts` |
| Hero portrait | replace `public/images/akshat-sharma.jpg` |
| Colours, spacing, typography | `app/globals.css` |

---

## Theming

Colours are CSS custom properties defined twice in `app/globals.css` — once on
`:root` for light, once on `.dark` — and mapped onto Tailwind utilities with
`@theme inline`, which keeps the `var()` reference in the output so the class
swap works at runtime.

To change the accent colour, edit `--accent` in both blocks. Nothing else needs
touching.

---

## Deploying to Vercel

### 1. Create a GitHub repository

```bash
git init
git add .
git commit -m "Initial commit"
```

Create an empty repository on GitHub (no README, no .gitignore), then:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

### 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Select the repository and click **Import**.
3. Leave every setting at its default — Vercel detects Next.js, and this project
   needs no environment variables.
4. Click **Deploy**.

The first build takes a minute or two. You get a `*.vercel.app` URL immediately.

### 3. Continuous deployment

Pushes to `main` deploy to production. Pull requests get their own preview URL.

### 4. Connect a custom domain

1. In the Vercel project, open **Settings → Domains**.
2. Add your domain.
3. At your registrar, add the DNS records Vercel shows you — usually an `A`
   record for the apex domain and a `CNAME` for `www`.
4. Wait for DNS to propagate. Vercel issues the TLS certificate automatically.

Then update `siteUrl` in `data/profile.ts` to the new domain and push, so
canonical URLs, `sitemap.xml` and `robots.txt` point at the right place.

---

## Accessibility and performance notes

- One `<h1>` per page; headings nest correctly.
- Skip-to-content link, visible focus rings, `aria-current` on the active nav item.
- Architecture diagrams are ordered lists of real text — they work with styles
  disabled and read correctly in a screen reader.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
- No layout shift from fonts (self-hosted, variable, `next/font`).
- No page scrolls horizontally at 375px; code blocks and tables scroll inside
  their own containers.
