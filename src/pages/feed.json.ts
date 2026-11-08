import { getCollection } from 'astro:content';

interface FeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  date_published: string;
  tags: string[];
}

export async function GET(context: { site: string | URL }) {
  const site = context.site;
  const absolute = (path: string): string =>
    /^https?:\/\//.test(path) ? path : new URL(path, site).href;

  const blog = await getCollection('blog', ({ data }) => data.status === 'published');
  const projects = await getCollection('projects', ({ data }) => data.status === 'published');
  const timeline = await getCollection(
    'timeline',
    ({ data }) => data.status === 'published' && !data.hide,
  );

  const items: FeedItem[] = [
    ...blog.map((post) => ({
      id: absolute(`/blog/${post.id}/`),
      url: absolute(`/blog/${post.id}/`),
      title: post.data.title,
      summary: post.data.seo_description ?? post.data.excerpt,
      date_published: new Date(post.data.date).toISOString(),
      tags: ['Blog', ...post.data.tags],
    })),
    ...projects.map((project) => ({
      id: absolute(`/projects/${project.id}/`),
      url: absolute(`/projects/${project.id}/`),
      title: project.data.title,
      summary: project.data.excerpt,
      date_published: new Date(project.data.date).toISOString(),
      tags: ['Project', ...project.data.tags],
    })),
    ...timeline.map((item) => ({
      id: absolute(item.data.url ?? `/timeline/${item.id}/`),
      url: absolute(item.data.url ?? `/timeline/${item.id}/`),
      title: item.data.title,
      summary: item.data.description ?? '',
      date_published: new Date(item.data.date).toISOString(),
      tags: ['Timeline', item.data.type],
    })),
  ].sort(
    (a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime(),
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Nishant Kumar Sagar',
    home_page_url: absolute('/'),
    feed_url: absolute('/feed.json'),
    description: 'Full activity feed: articles, projects and timeline updates.',
    language: 'en',
    authors: [{ name: 'Nishant Kumar Sagar', url: absolute('/about/') }],
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
