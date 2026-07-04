param(
  [ValidateSet("all", "installer", "portable")]
  [string]$Target = "all"
)

$ErrorActionPreference = "Stop"

Write-Host "EchoDeck Windows packaging" -ForegroundColor Cyan
Write-Host "Working directory: $(Get-Location)"

if (-not (Test-Path "package.json")) {
  throw "package.json not found. Run this script from the EchoDeck project root."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm was not found. Install Node.js LTS, then reopen PowerShell."
}

npm run lint:smoke

switch ($Target) {
  "installer" { npm run package:win:installer }
  "portable" { npm run package:win:portable }
  default { npm run package:win }
}

Write-Host "Done. Check the release folder." -ForegroundColor Green
Get-ChildItem -Path "release" -ErrorAction SilentlyContinue
