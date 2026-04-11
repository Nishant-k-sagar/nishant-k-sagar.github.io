import type { CollectionEntry } from 'astro:content';

export function sortPosts(posts: CollectionEntry<'blog'>[]) {
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  return sorted.map((post, index) => ({
    ...post,
    postNumber: sorted.length - index
  }));
}

export function sortProjects(projects: CollectionEntry<'projects'>[]) {
  return projects.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}