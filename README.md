# EchoDeck v0.1.1 — Local Desktop Music App MVP

EchoDeck is a local-first desktop music player prototype for macOS and Windows. It focuses on local music playback, playlist/queue management, EQ, visualizations, crossfade, modern/vintage themes, and source-aware streaming embeds.

This release is intentionally local-first. It does **not** extract, download, cache, modify, or re-stream protected music from YouTube, Spotify, Apple Music, or SoundCloud.

## What is included

- Electron-based local desktop shell
- Windows 11 run/build support
- macOS run/build support
- Local audio file import
- Local folder scanning in the desktop app
- Browser fallback file import
- Queue management
- Playlist management
- Shuffle, repeat, favorites
- 5-band EQ for local files
- Crossfade setting for local files
- Spectrum/wave/VU visualizers for local files
- Modern dark, modern light, vintage receiver, and cassette themes
- YouTube URL embed playback
- SoundCloud URL widget playback
- External YouTube/SoundCloud search launcher
- Spotify and Apple Music integration notes for future SDK work
- Local import/export backup JSON

## Fast start on Windows 11

```powershell
cd C:\docker\echodeck-macos-v0.1.0
npm install
npm start
```

Or use the helper:

```powershell
.\scriptsun-windows.ps1
```

## Package a Windows app

```powershell
npm run package:win
```

The packaged installer and portable EXE will be created under `release/`.

Expected outputs:

```text
EchoDeck-0.1.1-Windows-Setup.exe
EchoDeck-0.1.1-Windows-Portable.exe
```

Optional helper:

```powershell
.\scripts\package-windows.ps1 all
.\scripts\package-windows.ps1 installer
.\scripts\package-windows.ps1 portable
```

## Fast start on macOS

```bash
cd echodeck-macos-v0.1.0
npm install
npm start
```

## Package a macOS app

```bash
npm run package:mac
```

The packaged DMG/ZIP will be created under `release/`.

## Smoke test

```bash
npm run lint:smoke
```

## Notes

- Local files remain local by default.
- In the Electron desktop app, imported file paths can persist in the library metadata.
- In browser preview mode, files imported through the browser file picker are session-based because normal browsers do not allow persistent direct file playback without additional permissions.
- Streaming sources are source-controlled. EQ, audio analysis, visualizers, and crossfade apply to local files, not embedded streaming players.
- Windows prototype builds are unsigned. Windows Defender SmartScreen may warn until a future signed release.

## Project structure

```text
src/main.js              Electron main process
src/preload.js           Safe Electron bridge
src/renderer/index.html  App shell
src/renderer/styles.css  UI themes and layout
src/renderer/app.js      Player, queue, library, EQ, visualizer logic
docs/                    Requirements, roadmap, install notes
scripts/smoke-test.js    Basic project validation
scripts/run-windows.ps1  Windows run helper
scripts/package-windows.ps1 Windows packaging helper
```

## Recommended next version

v0.2.0 should add a small local metadata database, better track metadata extraction, Music folder watcher, artwork extraction, and a real YouTube Data API search configuration screen.

## Publish to GitHub

Recommended repository name going forward: `echodeck-desktop`.

Current repo can remain `echodeck-macos` if you already created it.

### Initial publish with GitHub CLI

```bash
git init
git add .
git commit -m "Initial EchoDeck desktop app"
git branch -M main
gh repo create echodeck-desktop --public --source=. --remote=origin --push --description "EchoDeck local-first desktop music player with local playback, playlists, EQ, visualizers, and source-aware streaming embeds."
```

### Create a GitHub release after pushing

```bash
gh release create v0.1.1   --title "EchoDeck v0.1.1"   --notes-file RELEASE_NOTES_v0.1.1.md   release/*
```

The included GitHub Actions workflow builds both macOS and Windows packages on pushes to `main`.
