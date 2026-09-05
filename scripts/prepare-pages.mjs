import { cp, access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist/client');
const prefix = '/Erlking-Archive/';
await cp(path.join(root, 'Erlking-Archive/_next'), path.join(root, '_next'), { recursive: true });
await writeFile(path.join(root, '.nojekyll'), '');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const assets = [...html.matchAll(/(?:src|href)="([^"?#]+)"/g)]
  .map((match) => match[1]).filter((url) => url.startsWith(prefix));
if (!assets.some((url) => url.endsWith('.css'))) throw new Error('Missing stylesheet');
for (const url of assets) await access(path.join(root, url.slice(prefix.length)));
if (!html.includes('https://leejinh0225.github.io/MC2102-Fluid/index.html')) throw new Error('Missing Fluid link');
console.log(`Pages asset paths verified: ${assets.length}`);
