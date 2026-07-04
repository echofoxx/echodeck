# EchoDeck v0.2.0

EchoDeck v0.2.0 is the first **Streaming Sources MVP** release. It keeps the app local-first while improving how YouTube and SoundCloud links can be added, queued, organized, and played through official embed/widget paths.

## Highlights

- Adds a Streaming Sources control center with source counts.
- Adds batch URL import for supported streaming sources.
- Supports one streaming URL per line.
- Supports optional label format: `Artist - Title | https://...`.
- Adds YouTube video, Shorts, Music URL, embed URL, and playlist URL parsing.
- Adds YouTube playlist embed playback through the official embedded player path.
- Improves SoundCloud URL intake and widget playback handling.
- Adds optional title and artist fields when adding a single streaming URL.
- Adds Open Source and Copy Link controls for the current streaming track.
- Adds source-aware queue and library actions for opening original streaming links.
- Keeps EQ, crossfade, and visualizers limited to local files where EchoDeck controls the audio path.
- Bumps app version to v0.2.0.

## Windows Downloads

Expected release assets:

- `EchoDeck-0.2.0-Windows-Setup.exe`
- `EchoDeck-0.2.0-Windows-Portable.exe`

## macOS Downloads

Expected release assets when built on macOS or GitHub Actions:

- `EchoDeck-0.2.0-macOS.dmg`
- `EchoDeck-0.2.0-macOS.zip`

## Compliance Notes

EchoDeck does not extract, download, cache, modify, or re-stream protected music from YouTube, Spotify, Apple Music, or SoundCloud. Streaming sources remain source-controlled through official embedded/widget or future SDK paths.

## Recommended Next Release

v0.3.0 should focus on Spotify groundwork:

- Spotify OAuth planning screen
- Spotify app/client configuration guide
- Spotify playlist metadata import path
- Web Playback SDK feasibility notes
- Clear Premium/account requirement messaging
