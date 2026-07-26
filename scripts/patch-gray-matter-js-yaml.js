'use strict';

const fs = require('node:fs');
const path = require('node:path');

const enginesPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'gray-matter',
  'lib',
  'engines.js'
);

if (!fs.existsSync(enginesPath)) {
  console.log('gray-matter is not installed; skipping js-yaml compatibility patch.');
  process.exit(0);
}

const before = `engines.yaml = {
  parse: yaml.safeLoad.bind(yaml),
  stringify: yaml.safeDump.bind(yaml)
};`;

const after = `const parseYaml = yaml.load || yaml.safeLoad;
const dumpYaml = yaml.dump || yaml.safeDump;

engines.yaml = {
  parse: parseYaml.bind(yaml),
  stringify: dumpYaml.bind(yaml)
};`;

const source = fs.readFileSync(enginesPath, 'utf8');

if (source.includes(after)) {
  console.log('gray-matter js-yaml compatibility patch already applied.');
  process.exit(0);
}

if (!source.includes(before)) {
  throw new Error(`Unable to apply gray-matter js-yaml compatibility patch: ${enginesPath} has unexpected contents.`);
}

fs.writeFileSync(enginesPath, source.replace(before, after));
console.log('Applied gray-matter js-yaml compatibility patch.');

