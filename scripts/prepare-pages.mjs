import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('dist');
const target = path.resolve('docs');

if (!fs.existsSync(source)) {
  console.error('dist folder not found; run npm run build first');
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
fs.writeFileSync(path.join(target, '.nojekyll'), '');
console.log('✓ GitHub Pages artifact prepared in docs/');
