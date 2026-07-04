const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'package.json',
  'src/main.js',
  'src/preload.js',
  'src/renderer/index.html',
  'src/renderer/styles.css',
  'src/renderer/app.js',
  'docs/INSTALL_MACOS.md',
  'docs/REQUIREMENTS.md',
  'docs/ROADMAP.md'
];

let ok = true;
for (const file of required) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing ${file}`);
    ok = false;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!pkg.scripts.start || !pkg.devDependencies.electron) {
  console.error('package.json is missing Electron start script or dependency.');
  ok = false;
}

if (ok) {
  console.log('EchoDeck smoke test passed.');
} else {
  process.exit(1);
}
