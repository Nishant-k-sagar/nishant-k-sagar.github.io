/**
 * Tag network: the single build-time relation store.
 *
 * You assign tags manually in frontmatter. This module normalizes them
 * (case-insensitive, de-duplicated), computes tag <-> item edges, tag <-> tag
 * co-occurrence weights, and item <-> item relatedness.
 *
 * No registry required to publish. The network is derived entirely from
 * what is published, and rebuilt on every deploy via tag-network.json.ts.
 */

export interface SourceItem {
  id: string;
  type: 'blog' | 'project';
  title: string;
  date: string;
  tags: string[];
  url: string;
  excerpt: string;
}

export interface TaggedItem extends Omit<SourceItem, 'tags'> {
  tags: string[];
}

export interface RelatedTag {
  slug: string;
  label: string;
  weight: number;
}

export interface TagNode {
  slug: string;
  label: string;
  count: number;
  items: TaggedItem[];
  relatedTags: RelatedTag[];
}

export interface TagNetwork {
  tags: TagNode[];
  items: TaggedItem[];
}

const ACRONYM_LABELS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  css: 'CSS',
  html: 'HTML',
  js: 'JS',
  llm: 'LLM',
  llms: 'LLMs',
  php: 'PHP',
  rag: 'RAG',
  sql: 'SQL',
  sqlite: 'SQLite',
  ts: 'TS',
  ui: 'UI',
  ux: 'UX',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  astro: 'Astro',
  react: 'React',
  python: 'Python',
  golang: 'Go',
  cosmosdb: 'CosmosDB',
};

export function slugifyTag(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function labelForTag(slug: string): string {
  if (!slug) return '';
  const override = ACRONYM_LABELS[slug];
  if (override) return override;
  return slug
    .split('-')
    .map((part) => {
      if (!part) return '';
      const known = ACRONYM_LABELS[part];
      if (known) return known;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

export function normalizeTags(rawTags: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of rawTags) {
    const slug = slugifyTag(raw);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    result.push(slug);
  }
  return result;
}

export function buildTagNetwork(items: SourceItem[]): TagNetwork {
  const taggedItems: TaggedItem[] = items.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    date: item.date,
    url: item.url,
    excerpt: item.excerpt,
    tags: normalizeTags(item.tags),
  }));

  const bySlug = new Map<string, TaggedItem[]>();
  for (const item of taggedItems) {
    for (const slug of item.tags) {
      const list = bySlug.get(slug);
      if (list) list.push(item);
      else bySlug.set(slug, [item]);
    }
  }

  const adjacency = new Map<string, Map<string, number>>();
  for (const item of taggedItems) {
    if (item.tags.length < 2) continue;
    for (let i = 0; i < item.tags.length; i++) {
      for (let j = i + 1; j < item.tags.length; j++) {
        const a = item.tags[i];
        const b = item.tags[j];
        if (!a || !b) continue;
        const inc = (from: string, to: string): void => {
          let inner = adjacency.get(from);
          if (!inner) {
            inner = new Map<string, number>();
            adjacency.set(from, inner);
          }
          inner.set(to, (inner.get(to) ?? 0) + 1);
        };
        inc(a, b);
        inc(b, a);
      }
    }
  }

  const byDateDesc = (a: TaggedItem, b: TaggedItem): number =>
    b.date.localeCompare(a.date);

  const tags: TagNode[] = Array.from(bySlug.entries())
    .map(([slug, list]) => {
      const sortedItems = [...list].sort(byDateDesc);
      const neighbours = adjacency.get(slug);
      const relatedTags: RelatedTag[] = neighbours
        ? Array.from(neighbours.entries())
            .map(([relSlug, weight]) => ({
              slug: relSlug,
              label: labelForTag(relSlug),
              weight,
            }))
            .sort((a, b) => b.weight - a.weight || a.label.localeCompare(b.label))
            .slice(0, 5)
        : [];
      return {
        slug,
        label: labelForTag(slug),
        count: sortedItems.length,
        items: sortedItems,
        relatedTags,
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const itemsSorted = [...taggedItems].sort(byDateDesc);
  return { tags, items: itemsSorted };
}

export function findRelatedItems(
  currentId: string,
  network: TagNetwork,
  limit = 3,
): TaggedItem[] {
  const current = network.items.find((item) => item.id === currentId);
  if (!current || current.tags.length === 0) return [];
  const currentTags = new Set(current.tags);

  const scored = network.items
    .filter((item) => item.id !== currentId)
    .map((item) => ({
      item,
      shared: item.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter((entry) => entry.shared > 0);

  scored.sort(
    (a, b) =>
      b.shared - a.shared || b.item.date.localeCompare(a.item.date),
  );

  return scored.slice(0, limit).map((entry) => entry.item);
}
