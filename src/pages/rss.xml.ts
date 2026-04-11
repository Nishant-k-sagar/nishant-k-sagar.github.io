import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: string | URL }) {
  // Get all content collections
  const blogPosts = await getCollection('blog');
  const projectPosts = await getCollection('projects');
  const timelineItems = await getCollection('timeline');
  
  // Filter only published items from each collection
  const publishedBlog = blogPosts
    .filter(post => post.data.status === 'published')
    .map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/blog/${post.id}/`,
      categories: ['Blog', ...post.data.tags]
    }));

  const publishedProjects = projectPosts
    .filter(post => post.data.status === 'published')
    .map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/projects/${post.id}/`,
      categories: ['Project', ...post.data.tags]
    }));

  const publishedTimeline = timelineItems
    .filter(item => !item.data.hide && item.data.status === 'published')
    .map(item => ({
      title: item.data.title,
      pubDate: new Date(item.data.date),
      description: item.data.description || '',
      link: item.data.url || `/timeline/${item.id}/`,
      categories: ['Timeline', item.data.type]
    }));

  // Combine all items and sort chronologically (newest first)
  const allFeedItems = [...publishedBlog, ...publishedProjects, ...publishedTimeline]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Nishant Kumar Sagar',
    description: 'Full activity feed - articles, projects and timeline updates',
    site: context.site,
    items: allFeedItems,
    customData: `<language>en-us</language>`
  });
}
