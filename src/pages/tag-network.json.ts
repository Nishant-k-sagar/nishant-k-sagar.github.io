import { getCollection } from 'astro:content';
import { buildTagNetwork, type SourceItem } from '../utils/tags';

/**
 * The tag network as machine-readable JSON.
 * Regenerated on every build from published posts/projects.
 * Acts as the build-time "vector store": tag -> items, tag -> tag,
 * item -> related items (computed on the fly from this payload).
 */
export async function GET() {
  const blog = await getCollection(
    'blog',
    ({ data }) => data.status === 'published',
  );
  const projects = await getCollection(
    'projects',
    ({ data }) => data.status === 'published',
  );

  const sources: SourceItem[] = [
    ...blog.map((post) => ({
      id: `blog/${post.id}`,
      type: 'blog' as const,
      title: post.data.title,
      date: post.data.date,
      tags: post.data.tags,
      url: `/blog/${post.id}/`,
      excerpt: post.data.seo_description ?? post.data.excerpt,
    })),
    ...projects.map((project) => ({
      id: `project/${project.id}`,
      type: 'project' as const,
      title: project.data.title,
      date: project.data.date,
      tags: project.data.tags,
      url: `/projects/${project.id}/`,
      excerpt: project.data.excerpt,
    })),
  ];

  const network = buildTagNetwork(sources);

  const payload = {
    version: '1',
    generatedFrom: 'blog + projects (published)',
    tags: network.tags.map((tag) => ({
      slug: tag.slug,
      label: tag.label,
      count: tag.count,
      items: tag.items.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        date: item.date,
        url: item.url,
      })),
      relatedTags: tag.relatedTags,
    })),
    items: network.items.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      date: item.date,
      url: item.url,
      tags: item.tags,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
