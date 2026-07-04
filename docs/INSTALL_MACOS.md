# EchoDeck macOS Install Guide

## Prerequisites

Install Node.js LTS from the official Node.js website or through Homebrew.

Using Homebrew:

```bash
brew install node
```

## Run from source

```bash
cd echodeck-macos-v0.1.0
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

## macOS Gatekeeper note

This prototype is not signed or notarized. If macOS blocks the app after packaging, use right-click > Open, or run from source with `npm start` during development.

A production release should add:

- Apple Developer certificate
- App signing
- Hardened runtime
- Notarization
- Proper iconset
- Automated release workflow
