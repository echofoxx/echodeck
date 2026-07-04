# EchoDeck v0.2.0 — Local Desktop Music App + Streaming Sources MVP

EchoDeck is a local-first desktop music player prototype for **Windows 11 and macOS**. It focuses on local music playback, playlist/queue management, EQ, visualizations, crossfade, modern/vintage themes, and source-aware streaming-source organization through official embed/widget paths.

This release is intentionally local-first. It does **not** extract, download, cache, modify, or re-stream protected music from YouTube, Spotify, Apple Music, or SoundCloud.

## Naming

The product name is now simply **EchoDeck**.

Recommended names going forward:

- App/product name: **EchoDeck**
- Local folder: `C:\docker\EchoDeck` on Windows or `~/dev/EchoDeck` on macOS
- GitHub repository: `echodeck`
- Package name: `echodeck`

Older folders or repositories named `echodeck-macos` can be renamed; the app is no longer macOS-only.

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
- YouTube video, Shorts, Music URL, embed URL, and playlist URL parsing
- YouTube playlist embed playback
- SoundCloud URL widget playback
- Batch streaming URL import
- Optional streaming title/artist metadata entry
- Source control center with local/YouTube/SoundCloud counts
- Open Source and Copy Link actions for streaming entries
- External YouTube/SoundCloud search launcher
- Spotify and Apple Music integration notes for future SDK work
- Local import/export backup JSON

## Fast start on Windows 11

```powershell
cd C:\docker\EchoDeck
npm install
npm start
```

If you are keeping the original extracted folder for now, this also works:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
npm install
npm start
```

Or use the helper:

```powershell
.\scripts\run-windows.ps1
```

## Package a Windows app

```powershell
npm run package:win
```

The packaged installer and portable EXE will be created under `release/`.

Expected outputs:

```text
EchoDeck-0.2.0-Windows-Setup.exe
EchoDeck-0.2.0-Windows-Portable.exe
```

Optional helper:

```powershell
.\scripts\package-windows.ps1 all
.\scripts\package-windows.ps1 installer
.\scripts\package-windows.ps1 portable
```

## Fast start on macOS

```bash
cd ~/dev/EchoDeck
npm install
npm start
```

## Package a macOS app

```bash
npm run package:mac
```

The packaged DMG/ZIP will be created under `release/`.

Expected outputs:

```text
EchoDeck-0.2.0-macOS.dmg
EchoDeck-0.2.0-macOS.zip
```

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
- macOS prototype builds are unsigned and not notarized. Gatekeeper may warn until a future signed/notarized release.

## Project structure

```text
src/main.js                 Electron main process
src/preload.js              Safe Electron bridge
src/renderer/index.html     App shell
src/renderer/styles.css     UI themes and layout
src/renderer/app.js         Player, queue, library, EQ, visualizer logic
docs/                       Requirements, roadmap, install notes
scripts/smoke-test.js       Basic project validation
scripts/run-windows.ps1     Windows run helper
scripts/package-windows.ps1 Windows packaging helper
scripts/run-macos.sh        macOS run helper
scripts/package-macos.sh    macOS packaging helper
```

## Recommended next version

v0.3.0 should add Spotify groundwork: OAuth configuration guidance, Spotify playlist metadata import planning, Web Playback SDK feasibility notes, and clear Premium/account requirement messaging. A later v0.4.0 should add Apple Music MusicKit planning and authorized playback groundwork.

## Publish to GitHub

Recommended repository name going forward: `echodeck`.

### Initial publish with GitHub CLI

```bash
git init
git add .
git commit -m "Initial EchoDeck desktop app"
git branch -M main
gh repo create echodeck --public --source=. --remote=origin --push --description "EchoDeck local-first desktop music player with local playback, playlists, EQ, visualizers, and source-aware streaming embeds."
```

### Rename an existing GitHub repository

If you already created `echofoxx/echodeck-macos`, rename it to `echodeck`:

```powershell
gh repo rename echodeck --repo echofoxx/echodeck-macos --yes
git remote set-url origin https://github.com/echofoxx/echodeck.git
```

If the name `echodeck` is not available, use `echodeck-desktop` instead.

### Create a GitHub release after pushing

```bash
gh release create v0.2.0 \
  --title "EchoDeck v0.2.0" \
  --notes-file RELEASE_NOTES_v0.2.0.md \
  release/*
```

The included GitHub Actions workflow builds both macOS and Windows packages on pushes to `main`.


## v0.2.0 Streaming URL intake

Paste one URL per line in the Sources view. Optional labeled format:

```text
Artist - Track Title | https://www.youtube.com/watch?v=VIDEO_ID
Playlist Name | https://www.youtube.com/playlist?list=PLAYLIST_ID
Mix Name | https://soundcloud.com/artist/track
```

Supported now: YouTube video URLs, YouTube Shorts, YouTube Music video URLs, YouTube embed URLs, YouTube playlists, and public SoundCloud URLs.
