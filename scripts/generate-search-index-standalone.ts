import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = './src/content';

async function generateSearchIndex() {
  console.log('Generating search index...');
  
  // Read blog posts
  const blogFiles = await readdir(join(CONTENT_ROOT, 'blog'));
  const blog = [];
  
  for (const file of blogFiles) {
    if (file.endsWith('.md')) {
      const raw = await readFile(join(CONTENT_ROOT, 'blog', file), 'utf8');
      const { data } = matter(raw);
      
      if (data.status === 'published') {
        blog.push({
          title: data.title,
          slug: `/blog/${file.replace('.md', '')}`,
          tags: data.tags || [],
          excerpt: data.excerpt || '',
          series: data.series
        });
      }
    }
  }

  // Read projects
  const projectFiles = await readdir(join(CONTENT_ROOT, 'projects'));
  const projects = [];
  
  for (const file of projectFiles) {
    if (file.endsWith('.md')) {
      const raw = await readFile(join(CONTENT_ROOT, 'projects', file), 'utf8');
      const { data } = matter(raw);
      
      if (data.status === 'published') {
        projects.push({
          title: data.title,
          slug: `/projects/${file.replace('.md', '')}`,
          tags: data.tags || [],
          excerpt: data.excerpt || ''
        });
      }
    }
  }

  const index = [...blog, ...projects];
  
  await writeFile('./public/search-index.json', JSON.stringify(index, null, 2));
  console.log(`✅ Search index generated with ${index.length} entries`);
}

generateSearchIndex();