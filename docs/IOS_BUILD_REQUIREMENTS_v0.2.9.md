# EchoDeck iOS Build Requirements

Planned for v0.3.0.

## Required

- macOS
- Xcode
- Node.js LTS
- Capacitor
- Apple Developer account for device signing / distribution

## Planned approach

EchoDeck will keep the desktop Electron shell and add a Capacitor iOS shell that reuses the responsive web UI.

## Important limitations

- Electron is desktop-only.
- iOS file import uses Apple document picker patterns.
- Streaming integrations must continue using official SDK/embed paths.
