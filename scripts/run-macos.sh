#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Install Node.js LTS first."
  exit 1
fi
if [ ! -d node_modules ]; then
  npm install
fi
npm start
