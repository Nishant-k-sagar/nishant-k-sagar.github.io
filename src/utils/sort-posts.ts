import type { CollectionEntry } from 'astro:content';
import { dateValue } from './format-date';

type Dated = { id: string; data: { date: string } };

/** Newest first. Ties (same date) fall back to id so the order never depends on file load order. */
function newestFirst<T extends Dated>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => dateValue(b.data.date) - dateValue(a.data.date) || a.id.localeCompare(b.id),
  );
}

/**
 * Sort posts newest first and attach a stable post number.
 *
 * Numbers are always counted across `allPosts` (every published post, oldest = #1),
 * so a post keeps the same number on the home page, the blog page and anywhere else,
 * even when only a subset (e.g. featured posts) is passed in `posts`.
 */
export function sortPosts(
  posts: CollectionEntry<'blog'>[],
  allPosts: CollectionEntry<'blog'>[] = posts,
) {
  const oldestFirst = newestFirst(allPosts).reverse();
  const numbers = new Map(oldestFirst.map((post, index) => [post.id, index + 1]));
  return newestFirst(posts).map((post) => ({
    ...post,
    postNumber: numbers.get(post.id) ?? 0,
  }));
}

export function sortProjects(projects: CollectionEntry<'projects'>[]) {
  return newestFirst(projects);
}
