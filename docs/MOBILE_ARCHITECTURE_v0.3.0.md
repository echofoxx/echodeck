# EchoDeck v0.3.0 — Mobile Architecture

## Current structure

```text
apps/
  desktop/
  ios/
  web/
packages/
  shared/
  player-core/
  themes/
  visualizers/
src/
  renderer/
```

The current app still runs from `src/renderer`.

## Future direction

Move shared logic into packages over time:

- `packages/player-core`
- `packages/themes`
- `packages/visualizers`
- `packages/shared`

The desktop Electron app and iOS Capacitor app should consume the same shared UI/player logic.
