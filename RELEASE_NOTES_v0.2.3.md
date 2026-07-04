# EchoDeck v0.2.3 — Analog Cream Theme + iOS Roadmap

EchoDeck v0.2.3 adds the new Analog Cream theme and starts preparing the app for a future mobile/iOS path.

## Highlights

- Added **Analog Cream** theme inspired by cassette, vinyl, EQ, and VU-meter mobile hi-fi interfaces.
- Fresh installs now default to Analog Cream while existing users keep their saved theme.
- Added dedicated theme card in Settings.
- Added iOS roadmap card in Settings.
- Added phone/touch-ready responsive styling for narrower windows.
- Kept Windows/macOS Electron desktop packaging intact.
- Added documentation for the future Capacitor iOS app path.

## Release Assets

Recommended Windows release assets:

- `EchoDeck-0.2.3-Windows-Setup.exe`
- `EchoDeck-0.2.3-Windows-Portable.exe`

macOS can still be packaged from source with `npm run package:mac`.

## Notes

This release does **not** ship a native iOS app yet. The planned iOS path is to reuse the EchoDeck web UI through a Capacitor shell, then add iOS file picker support, touch-first navigation, and Apple Music integration later.
