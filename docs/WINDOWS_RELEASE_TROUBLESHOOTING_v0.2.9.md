# EchoDeck v0.2.9 — Windows Release Troubleshooting

## npm is not recognized

Install Node.js LTS, reopen PowerShell, and verify:

```powershell
node -v
npm -v
```

## Electron install script warning

Run:

```powershell
npm approve-scripts electron
npm install
```

## Build output missing

Clean and rebuild:

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

## GitHub release asset missing

Upload manually:

```powershell
gh release upload v0.2.9 --repo echofoxx/echodeck release\EchoDeck-0.2.9-Windows-Setup.exe release\EchoDeck-0.2.9-Windows-Portable.exe --clobber
```
