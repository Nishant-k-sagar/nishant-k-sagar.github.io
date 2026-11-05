const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** True for plain calendar dates like "2026-04-10" (no time, no timezone). */
function isDateOnly(dateString: string): boolean {
  return DATE_ONLY.test(dateString);
}

/** True when the string parses to a real date. */
export function isValidDate(dateString: string): boolean {
  return !Number.isNaN(new Date(dateString).getTime());
}

/** Millisecond timestamp for sorting. Invalid dates sort as oldest instead of breaking the sort. */
export function dateValue(dateString: string): number {
  const time = new Date(dateString).getTime();
  return Number.isNaN(time) ? 0 : time;
}

/**
 * Format ISO date string to dd-mm-yyyy format
 * Returns format like "10-04-2026"
 *
 * Plain dates ("2026-04-10") are read as calendar dates in UTC and printed with UTC
 * getters, so the day never shifts with the machine's timezone.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const utc = isDateOnly(dateString);
  const day = (utc ? date.getUTCDate() : date.getDate()).toString().padStart(2, '0');
  const month = ((utc ? date.getUTCMonth() : date.getMonth()) + 1).toString().padStart(2, '0');
  const year = utc ? date.getUTCFullYear() : date.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatLocale(dateString: string, month: 'long' | 'short'): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    ...(isDateOnly(dateString) ? { timeZone: 'UTC' } : {}),
  });
}

/**
 * Format ISO date string to human readable long format
 * Returns format like "April 10, 2026"
 */
export function formatDateLong(dateString: string): string {
  return formatLocale(dateString, 'long');
}

/**
 * Format ISO date string to short readable format
 * Returns format like "Apr 10, 2026"
 */
export function formatDateShort(dateString: string): string {
  return formatLocale(dateString, 'short');
}
