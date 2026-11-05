// Converts the OpenAPI specs in ./apis to JSON with the Redocly CLI.
// Usage:
//   npm run bundle                          -> all specs, to ./dist/json
//   npm run bundle -- contribution.yaml usage.yaml -> only these specs
//   npm run bundle -- --out <dir> [specs]   -> different output folder
//   npm run bundle -- --prune-only          -> only remove JSON with no matching YAML
// Output is a 1:1 JSON copy of each YAML file (same openapi version, same content).
// JSON files whose YAML source no longer exists are always removed, so the
// folder mirrors ./apis.
//
// Redocly CLI version: set ONLY in package.json devDependencies and installed
// by `npm install`. To upgrade:  npm install -D -E @redocly/cli@<version>

import { readdirSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { join, resolve, parse, basename, dirname } from 'node:path';

// Locate the installed Redocly CLI and run it with node directly (no shell).
const require = createRequire(import.meta.url);
let redoclyCli;
let redoclyVersion;
try {
  const pkgPath = require.resolve('@redocly/cli/package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  redoclyCli = join(dirname(pkgPath), pkg.bin.redocly);
  redoclyVersion = pkg.version;
} catch {
  console.error('Redocly CLI is not installed. Run "npm install" in the openapi folder.');
  process.exit(1);
}

const apisDir = resolve('apis');

const args = process.argv.slice(2);
let outDir = resolve('dist/json');
const requested = [];
let pruneOnly = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') outDir = resolve(args[++i]);
  else if (args[i] === '--prune-only') pruneOnly = true;
  else requested.push(basename(args[i]));
}

const allSpecs = readdirSync(apisDir).filter((f) => /\.ya?ml$/i.test(f)).sort();
if (allSpecs.length === 0) {
  console.error(`No .yaml files found in ${apisDir}`);
  process.exit(1);
}

const missing = requested.filter((f) => !existsSync(join(apisDir, f)));
if (missing.length) {
  console.error(`Not found in ${apisDir}: ${missing.join(', ')}`);
  process.exit(1);
}
const specs = requested.length ? requested : allSpecs;

mkdirSync(outDir, { recursive: true });

// Remove JSON left over from deleted or renamed specs.
const expected = new Set(allSpecs.map((f) => `${parse(f).name}.json`));
for (const f of readdirSync(outDir)) {
  if (f.endsWith('.json') && !expected.has(f)) {
    rmSync(join(outDir, f));
    console.log(`DEL   ${f} (no matching YAML)`);
  }
}

if (pruneOnly) process.exit(0);

const failed = [];
for (const file of specs) {
  const out = join(outDir, `${parse(file).name}.json`);
  const result = spawnSync(
    process.execPath,
    [redoclyCli, 'bundle', join(apisDir, file), '--ext', 'json', '-o', out],
    { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' }
  );
  if (result.status === 0) {
    console.log(`OK    ${file}`);
  } else {
    failed.push(file);
    console.error(`FAIL  ${file}\n${result.stderr}`);
  }
}

console.log(
  `\n${specs.length - failed.length}/${specs.length} specs bundled to ${outDir} (Redocly CLI ${redoclyVersion})`
);
if (failed.length) process.exit(1);
