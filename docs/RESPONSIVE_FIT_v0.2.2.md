# EchoDeck v0.2.2 Responsive Fit Notes

EchoDeck v0.2.2 adds adaptive layout behavior to keep all panels inside the visible desktop window.

## What changed

- The app now assigns a responsive density mode to the document body based on window width and height.
- The Now Playing title is dynamically fit to the available metadata column.
- Grid children use `min-width: 0` and controlled overflow so long titles cannot force sibling panels off-screen.
- The Queue panel collapses below Now Playing on narrower or shorter windows.
- Typography, card padding, record size, visualizer height, and controls scale down in dense windows.

## Test checklist

1. Launch the app at roughly 1425x875.
2. Confirm the placeholder title does not overlap the Queue panel.
3. Resize the window narrower and shorter.
4. Confirm the Queue moves below the player when space is tight.
5. Add a long streaming title and confirm it wraps/clamps inside the player card.
6. Open the full-screen visualizer and confirm it still works.
