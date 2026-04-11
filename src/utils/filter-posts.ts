import type { CollectionEntry } from 'astro:content';

export function filterPublished<T extends { data: { status?: string } }>(entries: T[]) {
  return entries.filter(entry => entry.data.status === 'published');
}

export function filterForListings<T extends { data: { status?: string } }>(entries: T[]) {
  return entries.filter(entry => entry.data.status === 'published');
}