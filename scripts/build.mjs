import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
if (existsSync(dist)) await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const name of ['index.html', 'stock.html', 'vehicle.html']) {
  await cp(new URL(`../${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}
await cp(new URL('../src/', import.meta.url), new URL('../dist/src/', import.meta.url), { recursive: true });
if (existsSync(new URL('../public/', import.meta.url))) {
  await cp(new URL('../public/', import.meta.url), new URL('../dist/public/', import.meta.url), { recursive: true });
}
console.log('Built Puerto Motor prototype → dist/');
