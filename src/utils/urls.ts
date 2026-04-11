/**
 * Get canonical URL for blog post
 * Single source of truth for blog post routing
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}/`
}

/**
 * Get canonical URL for project
 */
export function getProjectUrl(slug: string): string {
  return `/projects/${slug}/`
}

/**
 * Get canonical URL for tag page
 */
export function getTagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`
}

/**
 * Get canonical URL for series page
 */
export function getSeriesUrl(slug: string): string {
  return `/series/${slug}/`
}
