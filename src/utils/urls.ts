import { slugifyTag } from './tags';

/**
 * Get canonical URL for blog post
 * Single source of truth for blog post routing
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}/`
}

export function getProjectUrl(slug: string): string {
  return `/projects/${slug}/`
}

/**
 * Tag relations live on the single /tags/ page as anchored groups.
 * No per-tag URL is generated. `/tags/#rag` jumps to the group.
 * Case-insensitive: `getTagUrl('RAG') === getTagUrl('rag')`.
 */
export function getTagUrl(tag: string): string {
  return `/tags/#${encodeURIComponent(slugifyTag(tag))}`
}
