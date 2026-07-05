# EchoDeck v0.3.0 — iOS Setup

EchoDeck v0.3.0 adds the first real iOS Capacitor scaffold while keeping the desktop Electron app intact.

## Windows vs macOS

You can apply this patch and commit it from Windows.

Actual iOS building requires:

- macOS
- Xcode
- Node.js LTS
- Apple Developer account for device signing/distribution

## Setup on macOS

```bash
npm install
npm run ios:doctor
npm run ios:prepare
npm run ios:add
npm run ios:sync
npm run ios:open
```

This opens the generated iOS project in Xcode.

## Current status

v0.3.0 is a scaffold release. It prepares the repository and scripts. It is not yet a fully App Store-ready mobile player.
