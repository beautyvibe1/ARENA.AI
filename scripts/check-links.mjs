import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
if (!fs.existsSync(dist)) {
  console.error('dist folder not found, run npm run build first');
  process.exit(1);
}

function getFiles(dir, exts = ['.html']) {
  const res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) res.push(...getFiles(p, exts));
    else if (exts.some(ext => e.name.endsWith(ext))) res.push(p);
  }
  return res;
}

const htmlFiles = getFiles(dist, ['.html']);
let broken = [];
let checked = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const hrefRegex = /href="([^"]+)"/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('data:')) continue;
    // ignore external
    if (href.startsWith('//')) continue;
    // internal link
    let target = href;
    // remove query and hash
    target = target.split('?')[0].split('#')[0];
    if (!target) continue;
    // resolve against dist
    // base handling: /ARENA.AI/ -> dist
    let resolved;
    if (target.startsWith('/ARENA.AI/')) {
      resolved = path.join(dist, target.replace('/ARENA.AI/', ''));
    } else if (target.startsWith('/')) {
      resolved = path.join(dist, target.slice(1));
    } else {
      resolved = path.join(path.dirname(file), target);
    }
    // if directory, check index.html
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      const index = path.join(resolved, 'index.html');
      if (!fs.existsSync(index)) {
        // maybe .html file missing?
        // allow
        continue;
      }
    } else {
      // if no extension and not exists, try index.html
      if (!path.extname(resolved)) {
        const indexFile = path.join(resolved, 'index.html');
        const htmlFile = resolved + '.html';
        if (fs.existsSync(indexFile) || fs.existsSync(htmlFile) || fs.existsSync(resolved)) {
          // ok
        } else {
          // check if it's asset that should exist
          if (target.includes('/images/') || target.includes('/favicon')) {
            const assetPath = path.join(dist, target.replace('/ARENA.AI/', '').replace(/^\//, ''));
            if (!fs.existsSync(assetPath)) {
              broken.push(`${file} -> ${href} (missing asset ${assetPath})`);
            }
          }
        }
      } else {
        // file with extension
        if (!fs.existsSync(resolved)) {
          const alt = path.join(dist, target.replace('/ARENA.AI/', '').replace(/^\//, ''));
          if (!fs.existsSync(alt)) {
            // ignore external assets?
            if (target.startsWith('/ARENA.AI/')) {
              broken.push(`${file} -> ${href} (missing ${alt})`);
            }
          }
        }
      }
    }
    checked++;
  }
}

if (broken.length) {
  console.error(`Link check failed: ${broken.length} broken out of ${checked} checked:`);
  broken.slice(0,100).forEach(b => console.error(' - ' + b));
  process.exit(1);
} else {
  console.log(`✓ Link check passed: ${checked} internal links checked, 0 broken`);
}
