/// <reference path="../src/env.d.ts" />
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { writeFile } from 'fs/promises';

async function generateSearchIndex() {
  const blog = await getCollection('blog', (post: CollectionEntry<'blog'>) => post.data.status === 'published');
  const projects = await getCollection('projects', (project: CollectionEntry<'projects'>) => project.data.status === 'published');

  const index = [
    ...blog.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      slug: `/blog/${post.id}`,
      tags: post.data.tags,
      excerpt: post.data.excerpt,
      series: post.data.series
    })),
    ...projects.map((project: CollectionEntry<'projects'>) => ({
      title: project.data.title,
      slug: `/projects/${project.id}`,
      tags: project.data.tags,
      excerpt: project.data.excerpt
    }))
  ];

  await writeFile('./public/search-index.json', JSON.stringify(index, null, 2));
  console.log(`✅ Search index generated with ${index.length} entries`);
}

generateSearchIndex();