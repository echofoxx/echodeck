#!/usr/bin/env node
const os = require('os');
const { execSync } = require('child_process');

function check(cmd, label) {
  try {
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
    console.log(`✅ ${label}: ${out.split('\n')[0]}`);
    return true;
  } catch {
    console.log(`❌ ${label}: not found or not available`);
    return false;
  }
}

console.log('EchoDeck iOS Doctor');
console.log('===================');
console.log(`Platform: ${os.platform()} ${os.release()}`);

check('node -v', 'Node.js');
check('npm -v', 'npm');
check('npx cap --version', 'Capacitor CLI');

if (os.platform() !== 'darwin') {
  console.log('\n⚠️  iOS builds require macOS + Xcode. You can prepare the repo on Windows, but run ios:add/open on a Mac.');
} else {
  check('xcodebuild -version', 'Xcode');
}

console.log('\nNext steps:');
console.log('1. On macOS: npm install');
console.log('2. npm run ios:prepare');
console.log('3. npm run ios:add');
console.log('4. npm run ios:sync');
console.log('5. npm run ios:open');
