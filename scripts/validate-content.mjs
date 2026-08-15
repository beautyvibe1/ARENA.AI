import fs from 'node:fs';

const productsPath = 'src/data/products.ts';
const content = fs.readFileSync(productsPath, 'utf8');

// basic checks
const checks = [];

// 1. Count products = 13
// count products by slug in product definitions (lines starting with optional spaces, slug:)
const productMatches = content.match(/^\s+slug:\s+"/gm) || [];
if (productMatches.length !== 13) {
  checks.push(`Expected 13 products, found ${productMatches.length}`);
}

// 2. Check each product has price, volume, officialUrl
const requiredFields = ['slug', 'brand', 'originalName', 'russianName', 'volume', 'price', 'officialUrl', 'lastVerified'];
for (const field of requiredFields) {
  const count = (content.match(new RegExp(`${field}:`, 'g')) || []).length;
  if (count < 13) checks.push(`Field ${field} appears only ${count} times, expected >=13`);
}

// 3. Check telegram token format: slug must be kebab, <64
const slugRegex = /slug:\s*"([^"]+)"/g;
let m;
while ((m = slugRegex.exec(content)) !== null) {
  const slug = m[1];
  if (slug.length > 50) checks.push(`Slug too long: ${slug}`);
  if (!/^[a-z0-9-]+$/.test(slug)) checks.push(`Invalid slug format: ${slug}`);
  const token = `product_${slug.replace(/-/g, '_')}`;
  if (token.length > 64) checks.push(`Telegram token too long for ${slug}: ${token}`);
  if (!/^[A-Za-z0-9_-]+$/.test(token)) checks.push(`Invalid telegram token: ${token}`);
}

// 4. Check products have price snapshot date mention
if (!content.includes('2026-08-14')) checks.push('Missing lastVerified date 2026-08-14');

// 5. Check site.ts has verified metrics
const siteContent = fs.readFileSync('src/data/site.ts', 'utf8');
if (!siteContent.includes('5,0') || !siteContent.includes('33')) {
  checks.push('site.ts missing verified Avito metrics');
}

if (checks.length) {
  console.error('Content validation failed:');
  checks.forEach(c => console.error(' - ' + c));
  process.exit(1);
} else {
  console.log('✓ Content validation passed: 13 products, valid slugs/tokens, metrics present');
}
