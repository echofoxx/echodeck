# EchoDeck iOS Capacitor Plan — v0.2.6

EchoDeck should keep Electron for desktop while using Capacitor for a first iOS shell.

## Shared UI Baseline

The v0.2.6 Mobile Preview is the design baseline for iOS:

- Bottom tab navigation
- Touch-sized transport controls
- Compact library cards
- Source-aware queue
- Analog Cream and deck modes
- Full-screen visualizer path

## iOS MVP Scope

1. Capacitor app scaffold
2. iOS project generated through Xcode
3. Document picker for user-selected audio files
4. Local metadata library stored on device
5. Mobile-first player, queue, and settings
6. Official streaming embeds only

## Constraints

- Electron is not used for iOS.
- Local file access uses user-selected files, not unrestricted folder scans.
- Streaming services must use official SDK/embed paths.
- Apple Music integration should be implemented through MusicKit in a later release.
