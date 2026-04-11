import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()),
    status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
    excerpt: z.string(),
    series: z.string().optional(),
    series_order: z.number().optional(),
    featured: z.boolean().optional(),
    highlighted: z.boolean().optional(),
    canonical_url: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
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
    date: z.string(),
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

export const collections = { blog, projects, pages, timeline };
