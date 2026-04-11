/**
 * Calculate estimated reading time for text content
 * Based on average reading speed of 200 words per minute
 * Returns formatted string like "3 min read"
 */
export function readingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
