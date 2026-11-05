/**
 * Get canonical URL for blog post
 * Single source of truth for blog post routing
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}/`
}


