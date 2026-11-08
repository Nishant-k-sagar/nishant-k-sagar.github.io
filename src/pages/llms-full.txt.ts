import { getCollection } from 'astro:content';

/**
 * Full text of every published article, project and standalone page, for
 * language models and agents. Generated at build time, so it stays current
 * without a manual step.
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

  const parts: string[] = [
    '# Nishant Kumar Sagar - full text',
    '',
    `> Complete text of every published article, project and standalone page on ${url('/')}`,
    '',
    'Generated at build time. Articles are newest first, then projects newest first, then pages alphabetically.',
    '',
    `Index for agents: ${url('/llms.txt')}`,
    '',
  ];

  for (const post of blog) {
    parts.push(
      '---',
      '',
      `## Article: ${post.data.title}`,
      '',
      `URL: ${url(`/blog/${post.id}/`)}`,
      `Published: ${post.data.date}${post.data.updated ? ` (updated ${post.data.updated})` : ''}`,
      `Tags: ${post.data.tags.join(', ')}`,
      '',
      post.body?.trim() ?? '',
      '',
    );
  }

  for (const project of projects) {
    parts.push(
      '---',
      '',
      `## Project: ${project.data.title}`,
      '',
      `URL: ${url(`/projects/${project.id}/`)}`,
      `Published: ${project.data.date}`,
      `Tags: ${project.data.tags.join(', ')}`,
      project.data.github ? `GitHub: ${project.data.github}` : '',
      '',
      project.body?.trim() ?? '',
      '',
    );
  }

  for (const page of pages) {
    parts.push(
      '---',
      '',
      `## Page: ${page.data.title}`,
      '',
      `URL: ${url(`/${page.id}/`)}`,
      '',
      page.body?.trim() ?? '',
      '',
    );
  }

  const text = parts.filter((line, index, all) => line !== '' || all[index - 1] !== '').join('\n');

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
