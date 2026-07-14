const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const pkg = readJson('package.json');
const lock = readJson('package-lock.json');
const versionFile = fs.readFileSync(path.join(root, 'VERSION.txt'), 'utf8').trim();
const versions = {
  'package.json': pkg.version,
  'package-lock.json': lock.version,
  'package-lock.json root package': lock.packages?.['']?.version,
  'VERSION.txt': versionFile
};

const mismatches = Object.entries(versions).filter(([, version]) => version !== pkg.version);
if (mismatches.length) {
  console.error(`Expected every release version to be ${pkg.version}:`);
  for (const [source, version] of mismatches) console.error(`- ${source}: ${version || '<missing>'}`);
  process.exit(1);
}

console.log(`EchoDeck version ${pkg.version} is consistent.`);
