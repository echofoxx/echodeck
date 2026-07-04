# EchoDeck v0.2.5 Mobile Preview Fix

## Issue

In v0.2.4, Mobile Preview still rendered the desktop sidebar next to the phone canvas. The deck mode strip and player content could also create horizontal scroll, making the simulated iOS/mobile layout look compressed and misaligned.

## Fix

v0.2.5 changes Mobile Preview into a dedicated phone canvas:

- Desktop sidebar is hidden in preview mode.
- Main panel is centered and capped at 430px wide.
- Controls stack vertically where needed.
- Deck tabs scroll horizontally inside the canvas.
- Now Playing, Queue, Visualizer, and Mini modes all use mobile-specific sizing rules.
- Overflow and text wrapping are constrained at the panel level.

## Result

Mobile Preview now serves as a better visual baseline for a future Capacitor/iOS shell while preserving the full desktop layout when preview mode is disabled.
