import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://beautyvibe1.github.io/ARENA.AI/',
  base: '/ARENA.AI/',
  output: 'static',
  integrations: [],
  compressHTML: true,
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
    css: {
      devSourcemap: true,
    },
  }
});
