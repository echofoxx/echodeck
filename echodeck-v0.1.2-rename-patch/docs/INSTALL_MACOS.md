# EchoDeck macOS Install Guide

EchoDeck v0.1.2 can run directly on macOS as an Electron desktop app and can also be packaged into a DMG/ZIP.

## Prerequisites

Install Node.js LTS from the official Node.js website or through Homebrew.

Using Homebrew:

```bash
brew install node
```

## Recommended folder name

Because the app is cross-platform, use this folder name going forward:

```bash
~/dev/EchoDeck
```

## Run from source

```bash
cd ~/dev/EchoDeck
npm install
npm start
```

## Development mode

```bash
npm run dev
```

Development mode opens the Electron developer tools.

## Build a local macOS package

```bash
npm run package:mac
```

Output will appear in:

```text
release/
```

Expected outputs:

```text
EchoDeck-0.1.2-macOS.dmg
EchoDeck-0.1.2-macOS.zip
```

## macOS Gatekeeper note

This prototype is not signed or notarized. If macOS blocks the app after packaging, use right-click > Open, or run from source with `npm start` during development.

A production release should add:

- Apple Developer certificate
- App signing
- Hardened runtime
- Notarization
- Proper iconset
- Automated release workflow
