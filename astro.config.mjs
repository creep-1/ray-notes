// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub 用户名 creep-1（已确认）；site/base 是 sitemap、robots.txt、RSS、og:url 的唯一来源
export default defineConfig({
  site: 'https://creep-1.github.io',
  base: '/ray-notes',
  integrations: [sitemap()],
});
