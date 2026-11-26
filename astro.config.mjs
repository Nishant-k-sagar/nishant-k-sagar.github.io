import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nishant-k-sagar.github.io',
  base: '/',
  output: 'static',
  // Inline the site stylesheet so the first paint does not wait on a CSS request.
  build: {
    inlineStylesheets: 'always',
  },
  // Astro 7 defaults to JSX whitespace handling; keep the HTML-aware behavior
  // from Astro 5/6 so inline spacing in existing content does not change.
  compressHTML: true,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  devToolbar: {
    enabled: false
  }
});
