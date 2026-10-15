// Converts every OpenAPI spec in ./apis to JSON with the Redocly CLI.
// Usage:  npm run bundle            -> writes to ../dist/json
//         npm run bundle -- <dir>   -> writes to <dir>
// Output is a 1:1 JSON copy of each YAML file (same openapi version, same content).

import { readdirSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve, parse } from 'node:path';

const REDOCLY = '@redocly/cli@2.63.0';
const apisDir = resolve('apis');
const outDir = resolve(process.argv[2] ?? '../dist/json');

const specs = readdirSync(apisDir).filter((f) => /\.ya?ml$/i.test(f)).sort();
if (specs.length === 0) {
  console.error(`No .yaml files found in ${apisDir}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const failed = [];
for (const file of specs) {
  const out = join(outDir, `${parse(file).name}.json`);
  const result = spawnSync(
    'npx',
    ['--yes', REDOCLY, 'bundle', `"${join(apisDir, file)}"`, '--ext', 'json', '-o', `"${out}"`],
    { stdio: ['ignore', 'ignore', 'pipe'], shell: true, encoding: 'utf8' }
  );
  if (result.status === 0) {
    console.log(`OK    ${file} -> ${out}`);
  } else {
    failed.push(file);
    console.error(`FAIL  ${file}\n${result.stderr}`);
  }
}

console.log(`\n${specs.length - failed.length}/${specs.length} specs bundled to ${outDir}`);
if (failed.length) process.exit(1);
