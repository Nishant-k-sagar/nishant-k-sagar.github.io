export type DateFormat = 'default' | 'long' | 'short';

export interface FormatOptions {
  format?: DateFormat;
}

/**
 * Format ISO date string to dd-mm-yyyy format
 * Returns format like "10-04-2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 * Format ISO date string to human readable long format
 * Returns format like "April 10, 2026"
 */
export function formatDateLong(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format ISO date string to short readable format
 * Returns format like "Apr 10, 2026"
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
