# EchoDeck v0.1.1 — Windows Packaging Release

## Summary

EchoDeck v0.1.1 turns the original macOS-focused desktop MVP into a cross-platform desktop package with Windows 11 build support.

## Added

- Windows installer build target using NSIS.
- Windows portable EXE build target.
- `npm run package:win` command.
- `npm run package:win:installer` command.
- `npm run package:win:portable` command.
- Windows install/build guide in `docs/INSTALL_WINDOWS.md`.
- PowerShell helper script: `scripts/package-windows.ps1`.
- PowerShell run helper script: `scripts/run-windows.ps1`.
- GitHub Actions workflow for both macOS and Windows builds.

## Changed

- Package name changed from `echodeck-macos` to `echodeck-desktop`.
- Version bumped from `0.1.0` to `0.1.1`.
- App UI version label updated to v0.1.1.

## Notes

- Windows builds are unsigned in this prototype release. Windows Defender SmartScreen may warn until the app is signed.
- Streaming playback remains source-aware and compliant: no stream extraction, downloading, caching, or protected-audio manipulation.
- EQ, visualizer, and crossfade remain focused on local files.
