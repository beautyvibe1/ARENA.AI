import { products } from '../data/products';

export async function GET() {
  const base = 'https://beautyvibe1.github.io/ARENA.AI/';
  const pages = [
    '',
    'catalog/',
    'about/',
    'delivery/',
    'reviews/',
    'preorder/',
    'contacts/',
    'legal/privacy/',
    'legal/returns/',
  ];
  const productPages = products.map(p => `products/${p.slug}/`);
  const all = [...pages, ...productPages];

  const urls = all.map(path => {
    const loc = base + path;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>2026-08-14</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
