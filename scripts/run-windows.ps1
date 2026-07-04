$ErrorActionPreference = "Stop"

if (-not (Test-Path "package.json")) {
  throw "package.json not found. Run this script from the EchoDeck project root."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm was not found. Install Node.js LTS, then reopen PowerShell."
}

npm install
npm start
