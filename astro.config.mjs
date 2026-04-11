import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nishant-k-sagar.github.io',
  base: '/',
  output: 'static',
  integrations: [tailwind(), mdx(), sitemap()],
  devToolbar: {
    enabled: false
  }
});
