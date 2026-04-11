import { getCollection } from 'astro:content';

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  type: 'blog' | 'project' | 'milestone' | 'achievement' | 'work' | 'note';
  description: string;
  url?: string;
  number?: number;
  pinned?: boolean;
  highlighted?: boolean;
}

export async function generateTimeline(): Promise<TimelineEntry[]> {
  // Get all content
  const blogPosts = await getCollection('blog', ({ data }) => data.status === 'published');
  const projects = await getCollection('projects', ({ data }) => data.status === 'published');
  const timelineOverrides = await getCollection('timeline');

  // Create override map
  const overrideMap = new Map(timelineOverrides.map(item => [item.id, item.data]));

  // Build base entries
  const baseEntries: (TimelineEntry | null)[] = [
    ...blogPosts.map(post => {
      const override = overrideMap.get(`blog-${post.id}`);

      if (override?.hide) {
        return null;
      }

      return {
        id: `blog-${post.id}`,
        date: override?.date || post.data.date,
        title: override?.title || post.data.title,
        type: 'blog' as const,
        description: override?.description || post.data.excerpt,
        url: `/blog/${post.id}`,
        pinned: override?.pinned,
        highlighted: override?.highlighted ?? post.data.highlighted,
      };
    }),

    ...projects.map(project => {
      const override = overrideMap.get(`project-${project.id}`);
      
      if (override?.hide) {
        return null;
      }

      return {
        id: `project-${project.id}`,
        date: override?.date || project.data.date,
        title: override?.title || project.data.title,
        type: 'project' as const,
        description: override?.description || project.data.excerpt,
        url: `/projects/${project.id}`,
        pinned: override?.pinned,
        highlighted: override?.highlighted ?? project.data.highlighted,
      };
    }),

    ...timelineOverrides
      .filter(item => item.data.status === 'published' && !item.data.hide && !item.id.startsWith('blog-') && !item.id.startsWith('project-'))
      .map(item => ({
        id: item.id,
        date: item.data.date,
        title: item.data.title,
        type: item.data.type,
        description: item.data.description || '',
        pinned: item.data.pinned,
        highlighted: item.data.highlighted,
      }))
  ];

  const filteredEntries = baseEntries.filter(Boolean) as TimelineEntry[];

  // Sort chronologically (oldest first) to assign numbers
  const sortedOldestFirst = [...filteredEntries].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Assign numbers
  sortedOldestFirst.forEach((entry, index) => {
    entry.number = index + 1;
  });

  // Return sorted by number descending (highest number first) for display
  return sortedOldestFirst.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return (b.number || 0) - (a.number || 0);
  });
}