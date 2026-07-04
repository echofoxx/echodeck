# EchoDeck v0.2.2 — Adaptive Panel Fit

EchoDeck v0.2.2 is a layout stabilization release focused on fixing text bleed and panel overflow in the Now Playing window.

## Fixes

- Prevents Now Playing title text from bleeding into the Queue panel.
- Adds dynamic fit-to-container title sizing.
- Adds responsive density modes for spacious, comfortable, dense, and compact windows.
- Tightens card padding, grid sizing, record size, visualizer height, and queue width based on available window size.
- Adds stronger `min-width: 0`, overflow, line-clamp, and text wrapping rules across panels.
- Collapses the Queue under the player on narrower or shorter windows.
- Keeps the v0.2.1 full-screen visualizer and visual modes.

## Build Outputs

Expected Windows release assets after packaging:

- EchoDeck-0.2.2-Windows-Setup.exe
- EchoDeck-0.2.2-Windows-Portable.exe

## Notes

This release is intentionally focused on responsive fit and usability polish before the next larger streaming integration release.
