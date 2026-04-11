# AGENTS.md — Personal Portfolio (Astro + GitHub Pages)

## 1. Core Principle

This is a fully static, content-driven personal portfolio and blog.
The design principles follow the basics and first principles of clean UI design and better UX. Built for long-term personal branding, technical writing, and recruiter visibility.

All work must follow:

- No backend
- No runtime data fetching
- No server-side logic
- No database
- Everything resolved at build time
- Git push is the only publishing mechanism
- No emojies in code or content at all. Avoid emojies at all cost.

---

## 2. Source of Truth

All content lives in:

/src/content/blog/       ← articles and writeups
/src/content/projects/   ← project case studies
/src/content/pages/      ← standalone pages content
/src/content/timeline/   ← experience and milestones
```

Rules:

- Never hardcode content in pages or components
- Never duplicate content outside markdown files
- Always use Astro content collections (`getCollection()`)
- One markdown file = one piece of content
- No any type used throughout the project
---

## 3. Content Schema

### Blog posts — `/src/content/blog/*.md`

Required frontmatter fields:

```yaml
title: string               # display title
date: string                # ISO 8601 — e.g. 2024-01-15
tags: string[]              # at least one tag required
excerpt: string             # max 300 chars, used in cards + meta description
```

Optional frontmatter fields:

```yaml
slug: string                # optional slug override
status: "draft" | "published" | "archived" (default: draft)
series: string              # series title, must match exactly across posts
series_order: number        # position within the series, 1-indexed
featured: boolean           # show on homepage (default: false)
highlighted: boolean        # highlight on timeline (default: false)
canonical_url: string       # if cross-posted elsewhere
seo_title: string           # overrides title in <title> tag (max 60 chars)
seo_description: string     # overrides excerpt in meta description (max 160 chars)
```

### Projects — `/src/content/projects/*.md`

Required frontmatter fields:

```yaml
title: string
date: string
tags: string[]
excerpt: string
```

Optional frontmatter fields:

```yaml
slug: string
status: "draft" | "published" | "archived" (default: draft)
github: string              # GitHub repo URL
live: string                # live demo URL
featured: boolean           # default: false
highlighted: boolean        # highlight on timeline (default: false)
```

### Pages — `/src/content/pages/*.md`

Required frontmatter fields:

```yaml
title: string
excerpt: string
```

Optional frontmatter fields:

```yaml
status: "draft" | "published" | "archived" (default: draft)
seo_title: string
seo_description: string
```

### Timeline — `/src/content/timeline/*.md`

Required frontmatter fields:

```yaml
date: string
title: string
type: "blog" | "project" | "milestone" | "achievement" | "work" | "note"
```

Optional frontmatter fields:

```yaml
description: string
url: string
status: "draft" | "published" | "archived" (default: published)
hide: boolean
pinned: boolean
highlighted: boolean
```

### Status rules

- `status: draft` → file exists in repo, never appears on public site
- `status: published` → built and fully live
- `status: archived` → built, URL still resolves, excluded from all listings and sitemap
- Missing status → treated as `draft`

### Forbidden

- Missing required fields
- Invalid YAML syntax
- Fields not defined in schema
- Duplicate slugs across any content type
- Slugs with spaces, uppercase, or special characters

---

## 4. Build-Time Only Data

All data transformations happen exclusively at build time.

Allowed:

- Sorting posts by date, featured flag
- Grouping and counting tags
- Pagination logic
- Filtering drafts and archived posts
- Generating series order and prev/next links
- Generating search index
- Generating RSS feed
- Generating sitemap

Forbidden:

- `fetch()` for internal content data
- API calls for any content
- Runtime computation for core page data
- `getServerSideProps` or equivalent patterns
- Any SSR adapter

---

## 5. Project Structure

```
portfolio/
  src/
    content/
      blog/                       ← markdown articles
      projects/                   ← markdown project entries
      pages/                      ← standalone markdown pages
      timeline/                   ← timeline entries

    pages/
      index.astro                 → /
      blog.astro                  → /blog
      blog/[slug].astro           → /blog/post-slug
      projects.astro              → /projects
      projects/[slug].astro       → /projects/post-slug
      tags/[tag].astro            → /tags/javascript
      timeline.astro              → /timeline
      timeline/[slug].astro       → /timeline/milestone
      about.astro                 → /about
      now.astro                   → /now
      socials.astro               → /socials

    layouts/
      BaseLayout.astro            ← wraps every page (head, nav, footer, SEO)

    components/
      Header.astro
      Footer.astro
      BlogCard.astro              ← article preview card in listings
      ProjectCard.astro           ← project card in grid
      TagBadge.astro              ← pill tag with link
      SocialIcon.astro            ← social links
      ReadingTime.astro           ← word count / 200

    utils/
      generate-timeline.ts        ← parse and build timeline
      reading-time.ts             ← words / 200, returns "N min read"
      sort-posts.ts               ← sort by date descending
      filter-posts.ts             ← exclude drafts
      format-date.ts              ← date formatting utils
      urls.ts                     ← link generation helpers

  scripts/
    generate-search-index.ts      ← reads content, writes search-index.json

  .github/
    workflows/
      deploy.yml                  ← only CI/CD pipeline, do not add others

  astro.config.mjs
  tailwind.config.mjs
  package.json
  tsconfig.json
  AGENTS.md
```

---

## 6. Routing Rules

All routes use Astro file-based routing only.

Allowed:

- `/blog/[slug].astro` — dynamic routes via `getStaticPaths()`
- `/tags/[tag].astro` — tag pages
- `/projects/[slug].astro` — project pages
- `/timeline/[slug].astro` — timeline detail pages

Forbidden:

- Query string based routing (`?tag=js`)
- Client-side routing libraries (React Router etc.)
- Dynamic runtime routing of any kind
- Routes that depend on runtime data

Every dynamic route must export `getStaticPaths()` that returns all possible paths at build time.

---

## 7. Search System

Search is fully static, generated at build time, resolved client-side.

### Build time

`scripts/generate-search-index.ts` runs before deploy.
Reads all `status: published` posts.
Writes to `public/search-index.json`.

Index shape (per entry):

```ts
{
  title: string
  slug: string        // full path e.g. /blog/my-post
  tags: string[]
  excerpt: string
  series?: string
}
```

### Runtime (client-side only)

`/search` page loads `search-index.json` via fetch on page load.
Fuse.js initialises with the index.
Filters as user types — no server involved.

Fuse.js config:

```ts
{
  keys: ['title', 'tags', 'excerpt', 'series'],
  threshold: 0.3,
  includeScore: true
}
```

Constraints:

- No full article body in index
- No HTML or raw markdown in index
- Total `search-index.json` must stay under 500KB
- excerpt field is the only text content allowed in index

---

## 8. SEO Rules

Every page must include inside `<head>` via `Base.astro`:

```html
<title>{seo_title || title} | Your Name</title>
<meta name="description" content="{seo_description || excerpt}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{excerpt}" />
<meta property="og:image" content="{cover || default_og_image}" />
<meta property="og:type" content="article" />  <!-- website on non-article pages -->
<link rel="canonical" href="{canonical_url || current_url}" />
```

JSON-LD per article page:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "post title",
  "author": { "@type": "Person", "name": "Your Name" },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "description": "excerpt",
  "image": "cover image url"
}
```

Homepage must include `Person` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://yourusername.github.io",
  "sameAs": [
    "https://github.com/yourusername",
    "https://linkedin.com/in/yourusername"
  ]
}
```

Sitemap — `/sitemap.xml.ts`:
- Published posts only
- Archived posts excluded
- Auto-generated via `@astrojs/sitemap`

RSS — `/rss.xml.ts`:
- Published posts only
- Includes title, excerpt, date, link

---

## 9. Image Rules

- Store all images in `/public/images/`
- Compress before committing — use squoosh.app or imagemin
- Prefer WebP format
- Reference in markdown as `/images/filename.webp`
- Use Astro's `<Image />` component in `.astro` files — handles optimisation automatically
- Use `loading="lazy"` on all images below the fold
- Never commit uncompressed originals
- Never store images in `/src/` — only `/public/images/`
- Never reference images by absolute external URL unless it is a cover from an external source

---

## 10. UI and Styling Rules

Styling: Tailwind CSS only.

Principles:

- Content first — typography and readability over decoration
- Minimal JavaScript — only where interaction is genuinely needed
- No heavy client-side frameworks on content pages
- Clean, fast, accessible layout

Allowed interactive components (client-side JS):

- Search bar (`SearchBar.astro`) — Fuse.js only
- Mobile nav toggle — vanilla JS, no library
- TOC highlight on scroll — vanilla JS, IntersectionObserver

Forbidden:

- React, Vue, Svelte islands unless absolutely necessary
- Animation libraries (GSAP, Framer Motion etc.)
- CSS-in-JS
- Unnecessary hydration (`client:load` without strong reason)
- Heavy UI component libraries

---

## 11. Astro Config Rules

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/',
  output: 'static',
  integrations: [tailwind(), mdx(), sitemap()]
})
```

Forbidden changes to config:

- Changing `output` from `static`
- Adding any server adapter (`@astrojs/cloudflare`, `@astrojs/node` etc.)
- Adding SSR-only integrations
- Changing `site` without updating canonical URLs everywhere

---

## 12. CI/CD Pipeline

One workflow file only: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx tsx scripts/generate-search-index.ts
      - uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Rules:

- Search index must be generated before `astro build`
- `withastro/action@v3` handles build and artifact upload automatically
- Never commit `/dist/` to the repo
- Never run `astro build` manually and push output
- `workflow_dispatch` allows manual trigger from GitHub UI when needed

---

## 13. Publishing Workflow

The only way to publish content:

```
1. Write markdown file in src/content/blog/ or src/content/projects/
2. Set status: published in frontmatter
3. git add . && git commit -m "publish: article title"
4. git push origin main
5. GitHub Actions builds and deploys automatically
6. Site live in ~60 seconds
```

To unpublish: change `status: published` → `status: draft`, push.
To archive: change `status: published` → `status: archived`, push.
To edit: edit the file, push. Build reruns, content updates.

---

## 14. Performance Rules

Targets:

- Lighthouse Performance score ≥ 90
- LCP < 2.5s
- CLS = 0
- Total JS on content pages < 20KB

Rules:

- No large JSON files (search index hard cap: 500KB)
- No duplicate data across files
- No unnecessary npm dependencies — check bundle impact before adding
- Self-host fonts or use system font stack
- Compress all images before commit
- No render-blocking scripts — use `defer` or `type="module"`

---

## 15. TypeScript Rules

- No `any` type — use `unknown` and narrow properly
- Define types for all frontmatter schemas using Astro content collection `defineCollection()`
- One responsibility per file
- Utils in `/src/utils/` must be pure functions with no side effects
- No `console.log` in production code — use TODO comments if debugging

---

## 16. File System Rules

Allowed edits:

```
/src/content/         ← add/edit/delete markdown files
/src/pages/           ← add/edit routes
/src/components/      ← add/edit components
/src/layouts/         ← add/edit layouts
/src/utils/           ← add/edit utility functions
/scripts/             ← only generate-search-index.ts
/public/images/       ← add compressed images
/.github/workflows/   ← only deploy.yml
/astro.config.mjs
/tailwind.config.mjs
/package.json
/tsconfig.json
/AGENTS.md
```

Forbidden:

- Editing or committing `/dist/` manually
- Adding files to `/public/` that are generated (except search-index.json via script)
- Creating additional GitHub Actions workflow files
- Adding backend code, server routes, or database connections anywhere

---

## 17. Error Handling

If unsure about an implementation:

1. Follow existing patterns in the codebase first
2. Prefer the simpler solution
3. Avoid introducing new abstractions or dependencies
4. Leave a `// TODO:` comment explaining the issue
5. Never break the build to introduce a feature — ship working code only

---

## 18. Definition of Done

A change is complete only when all of the following pass:

- `npm run dev` runs without errors
- `npm run build` succeeds with zero errors and zero warnings
- `npm run preview` renders all pages correctly
- All routes return correct content
- No broken internal links
- Search index generated and search works correctly
- GitHub Actions pipeline passes end to end
- Site deploys and is live at the correct URL
- No unnecessary increase in bundle size
- Lighthouse score does not regress

---

## 19. Strictly Forbidden — Non-Negotiable

- Adding a backend of any kind
- Introducing a database
- Creating API routes
- Adding SSR or hybrid output mode
- Adding server adapters
- Storing full article content in the search index
- Hardcoding content in pages or components
- Committing `/dist/` to the repo
- Manual deployment outside GitHub Actions
- Breaking the static architecture
- Adding client-side data fetching for core content
- Introducing heavy client-side frameworks on content pages

---

## 20. Pages Reference

| Route | File | Description |
|---|---|---|
| `/` | `pages/index.astro` | Hero, bio, featured posts, featured projects |
| `/blog` | `pages/blog.astro` | Paginated post listing, tag filter |
| `/blog/[slug]` | `pages/blog/[slug].astro` | Full article, reading time, tags |
| `/tags/[tag]` | `pages/tags/[tag].astro` | Posts filtered by tag |
| `/projects` | `pages/projects.astro` | Projects grid |
| `/projects/[slug]` | `pages/projects/[slug].astro` | Project detail, tech stack, links |
| `/timeline` | `pages/timeline.astro` | Global timeline combining timeline entries, blogs, projects |
| `/timeline/[slug]` | `pages/timeline/[slug].astro` | Timeline entry details |
| `/about` | `pages/about.astro` | Bio, background, skills |
| `/now` | `pages/now.astro` | What you're currently working on |
| `/socials` | `pages/socials.astro` | Social links / linktree alternative |

---

## 21. Final Principle

This is a static publishing system powered by Git and CI/CD.

You write. You push. The site updates. Nothing else.

Always prioritise:

- Simplicity over cleverness
- Determinism over flexibility
- Performance over features
- Automation over manual steps
- Content clarity over UI complexity