# EchoDeck iOS App Path — v0.2.3

EchoDeck can become an iOS app, but Electron is desktop-only. The recommended iOS path is to reuse the EchoDeck web UI in a Capacitor shell first, then add native iOS capabilities incrementally.

## Recommended Direction

1. Keep `apps/desktop` as the Electron desktop target for Windows/macOS.
2. Extract shared UI/player logic into reusable packages over time.
3. Add a Capacitor iOS wrapper for the same UI.
4. Use iOS document/file picker for local audio import.
5. Add touch-first layouts based on the Analog Cream theme.
6. Add Apple Music through the official platform path later.

## Early iOS MVP

- Touch-first Now Playing screen
- Analog Cream default theme
- Files app import through document picker
- Playlists and queue
- Visualizer screens
- Streaming URL library entries where embeds are supported

## Not in v0.2.3

- No iOS binary or Xcode project is included yet.
- No App Store packaging.
- No Apple Music SDK integration yet.
