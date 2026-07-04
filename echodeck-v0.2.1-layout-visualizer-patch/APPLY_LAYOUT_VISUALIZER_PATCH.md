# Apply EchoDeck v0.2.1 Layout + Visualizer Patch

This patch updates EchoDeck to v0.2.1.

## What it changes

- Fixes the Now Playing layout so it fits better inside the default desktop window.
- Reduces oversized player/card minimum widths and heights.
- Adds a full-screen visualizer overlay.
- Adds Radial and Orbit visualizer modes.
- Adds a `⛶` full-screen visualizer button to Now Playing.
- Adds a **Full Screen** button to EQ / Visuals.
- Adds ambient source-safe visuals for streaming entries.
- Bumps the app to version `0.2.1`.

## Apply on Windows PowerShell

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.1-layout-visualizer-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

## Build Windows installer and portable EXE

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

Expected output:

```text
release\EchoDeck-0.2.1-Windows-Setup.exe
release\EchoDeck-0.2.1-Windows-Portable.exe
```

## Commit and publish

```powershell
git status
git add .
git commit -m "Release EchoDeck v0.2.1 layout and visualizer update"
git push

gh release create v0.2.1 `
  --repo echofoxx/echodeck `
  --title "EchoDeck v0.2.1" `
  --notes-file RELEASE_NOTES_v0.2.1.md `
  release\EchoDeck-0.2.1-Windows-Setup.exe `
  release\EchoDeck-0.2.1-Windows-Portable.exe
```
