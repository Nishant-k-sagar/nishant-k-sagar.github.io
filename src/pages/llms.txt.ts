import { getCollection } from 'astro:content';

/**
 * Curated index for language models and agents (https://llmstxt.org).
 * Generated at build time from the content collections, so new posts, projects
 * and pages appear automatically on the next deploy.
 */
export async function GET(context: { site: string | URL }) {
  const site = context.site;
  const url = (path: string): string => new URL(path, site).href;

  const blog = (
    await getCollection('blog', ({ data }) => data.status === 'published')
  ).sort((a, b) => b.data.date.localeCompare(a.data.date));

  const projects = (
    await getCollection('projects', ({ data }) => data.status === 'published')
  ).sort((a, b) => b.data.date.localeCompare(a.data.date));

  const pages = (
    await getCollection('pages', ({ data }) => data.status === 'published')
  ).sort((a, b) => a.id.localeCompare(b.id));

  const lines: string[] = [
    '# Nishant Kumar Sagar',
    '',
    '> Software engineer writing about distributed systems, agentic engineering, Astro and developer tooling. Projects, articles and a running timeline.',
    '',
    'This is the personal site of Nishant Kumar Sagar. It is fully static, built with Astro and deployed on GitHub Pages. Blog articles are the primary content; projects link to open-source work.',
    '',
    '## Core pages',
    '',
    `- [Home](${url('/')}): Intro, work experience, featured articles and projects, skills.`,
    `- [Blog](${url('/blog/')}): All published articles.`,
    `- [Projects](${url('/projects/')}): Project case studies.`,
    `- [Timeline](${url('/timeline/')}): Chronological milestones, articles and projects.`,
    `- [Socials](${url('/socials/')}): GitHub, LinkedIn and email links.`,
    `- [Search](${url('/search/')}): Client-side search over all published content.`,
    ...pages.map(
      (page) => `- [${page.data.title}](${url(`/${page.id}/`)}): ${page.data.excerpt}`,
    ),
    '',
    '## Articles',
    '',
    ...blog.map(
      (post) =>
        `- [${post.data.title}](${url(`/blog/${post.id}/`)}): ${post.data.seo_description ?? post.data.excerpt}`,
    ),
    '',
    '## Projects',
    '',
    ...projects.map(
      (project) =>
        `- [${project.data.title}](${url(`/projects/${project.id}/`)}): ${project.data.excerpt}`,
    ),
    '',
    '## Machine-readable',
    '',
    `- [Sitemap](${url('/sitemap-index.xml')})`,
    `- [RSS feed](${url('/rss.xml')})`,
    `- [JSON Feed](${url('/feed.json')})`,
    `- [Full text for language models](${url('/llms-full.txt')})`,
    `- [Search index](${url('/search-index.json')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
