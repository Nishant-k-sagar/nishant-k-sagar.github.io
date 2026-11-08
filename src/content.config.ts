import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { isValidDate, isValidMonth } from './utils/format-date';

// Dates must be real dates (use YYYY-MM-DD). A typo fails the build instead of rendering "NaN-NaN-NaN".
const dateString = z.string().refine(isValidDate, { message: 'Invalid date. Use YYYY-MM-DD, e.g. 2026-04-10' });


const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: dateString,
    updated: dateString.optional(),
    tags: z.array(z.string()),
    status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
    excerpt: z.string(),
    cover: z.string().optional(),
    series: z.string().optional(),
    series_order: z.number().optional(),
    featured: z.boolean().optional(),
    highlighted: z.boolean().optional(),
    canonical_url: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    wrap_code: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: dateString,
    tags: z.array(z.string()),
    excerpt: z.string(),
    status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
    github: z.string().optional(),
    live: z.string().optional(),
    featured: z.boolean().optional().default(false),
    highlighted: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/timeline" }),
  schema: z.object({
    date: dateString,
    title: z.string(),
    type: z.enum(['blog', 'project', 'milestone', 'achievement', 'work', 'note']),
    description: z.string().optional(),
    url: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional().default('published'),
    hide: z.boolean().optional(),
    pinned: z.boolean().optional(),
    highlighted: z.boolean().optional(),
  }),
});

// Content that used to be written inside page files. Editable from the CMS like everything else.
// Home page intro. The home page shows the entry named "intro".
const home = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft', 'published', 'archived']).optional().default('published'),
  }),
});

// Skills groups shown on the home page, ordered by `order`.
const skills = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/skills" }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional().default(100),
    items: z.array(z.string()).min(1),
    status: z.enum(['draft', 'published', 'archived']).optional().default('published'),
  }),
});

// Work experience shown on the home page, ordered by start date (newest first).
// The body of each markdown file is the description text.
const monthString = z
  .string()
  .refine(isValidMonth, { message: 'Invalid month. Use YYYY-MM, e.g. 2024-01' });

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    url: z.string().url().optional(),
    start: monthString.optional(),
    end: monthString.optional(),
    period: z.string().optional(),
    location: z.string().optional(),
    order: z.number().optional().default(100),
    status: z.enum(['draft', 'published', 'archived']).optional().default('published'),
  }),
});

// Links on the Socials page, ordered by `order`.
const socials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/socials" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string(),
    icon: z.enum(['github', 'linkedin', 'email', 'globe']).optional().default('globe'),
    order: z.number().optional().default(100),
    status: z.enum(['draft', 'published', 'archived']).optional().default('published'),
  }),
});

export const collections = { blog, projects, pages, timeline, home, skills, socials, experience };
