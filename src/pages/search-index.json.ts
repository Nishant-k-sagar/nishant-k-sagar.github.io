import { getCollection } from 'astro:content';

interface SearchEntry {
  title: string;
  url: string;
  type: 'blog' | 'project';
  tags: string[];
  excerpt: string;
}

export async function GET(): Promise<Response> {
  const blog = await getCollection('blog', ({ data }) => data.status === 'published');
  const projects = await getCollection('projects', ({ data }) => data.status === 'published');

  const entries: SearchEntry[] = [
    ...blog.map((post) => ({
      title: post.data.title,
      url: `/blog/${post.id}/`,
      type: 'blog' as const,
      tags: post.data.tags,
      excerpt: post.data.excerpt,
    })),
    ...projects.map((project) => ({
      title: project.data.title,
      url: `/projects/${project.id}/`,
      type: 'project' as const,
      tags: project.data.tags,
      excerpt: project.data.excerpt,
    })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
