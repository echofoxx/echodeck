#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const required = [
  'capacitor.config.json',
  'src/renderer/index.html',
  'src/renderer/app.js',
  'src/renderer/styles.css'
];

let ok = true;
for (const rel of required) {
  const full = path.join(process.cwd(), rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${rel}`);
    ok = false;
  } else {
    console.log(`OK: ${rel}`);
  }
}

const iosDir = path.join(process.cwd(), 'apps', 'ios');
fs.mkdirSync(iosDir, { recursive: true });

const marker = path.join(iosDir, 'IOS_SCAFFOLD_READY.txt');
fs.writeFileSync(marker, `EchoDeck iOS scaffold prepared at ${new Date().toISOString()}\n`);

if (!ok) {
  process.exit(1);
}

console.log('\nEchoDeck iOS scaffold is ready.');
console.log('Run on macOS: npm run ios:add && npm run ios:sync && npm run ios:open');
