/**
 * Get canonical URL for blog post
 * Single source of truth for blog post routing
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}/`
}

/** Tag pages are generated from lower-cased tags (see src/pages/tags/[tag].astro). */
export function getTagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag.toLowerCase())}`
}
