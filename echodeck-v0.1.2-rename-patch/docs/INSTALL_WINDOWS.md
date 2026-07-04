# EchoDeck Windows 11 Install and Build Guide

EchoDeck v0.1.2 can run directly on Windows 11 as an Electron desktop app and can also be packaged into a Windows installer or portable EXE.

## Prerequisites

Install these first:

1. Git for Windows
2. Node.js LTS, which includes npm
3. GitHub CLI, optional but recommended if you publish releases

Check your tools in PowerShell:

```powershell
node -v
npm -v
git --version
gh --version
```

If `node` or `npm` is not recognized, install Node.js LTS and reopen PowerShell.

## Recommended folder name

Because the app is now cross-platform, use this folder name going forward:

```powershell
C:\docker\EchoDeck
```

To rename your existing folder:

```powershell
cd C:\docker
Rename-Item "C:\docker\echodeck-macos-v0.1.0" "EchoDeck"
cd C:\docker\EchoDeck
```

## Run the app locally

From PowerShell:

```powershell
cd C:\docker\EchoDeck
npm install
npm start
```

The app should open as a local Windows desktop app.

## Package a Windows installer and portable app

```powershell
cd C:\docker\EchoDeck
npm run package:win
```

Build outputs will appear in:

```powershell
C:\docker\EchoDeck\release
```

Expected outputs:

```text
EchoDeck-0.1.2-Windows-Setup.exe
EchoDeck-0.1.2-Windows-Portable.exe
```

## Build only the installer

```powershell
npm run package:win:installer
```

## Build only the portable EXE

```powershell
npm run package:win:portable
```

## Common Windows notes

### `npm` is not recognized

Install Node.js LTS, then close and reopen PowerShell.

### Electron install script warning

If npm warns that Electron has a pending install script, approve Electron, then reinstall:

```powershell
npm approve-scripts electron
npm install
```

### Windows Defender SmartScreen

The installer is unsigned in this prototype release. Windows may show a SmartScreen warning until the app is code-signed with a Windows code-signing certificate.

### FFmpeg unsupported pixel format logs

Electron may print Chromium media warnings during embedded media playback. If the app window opens and playback works, these messages are generally non-fatal logs.

## Recommended release workflow

```powershell
npm run lint:smoke
npm run package:win
git status
git add .
git commit -m "Normalize EchoDeck cross-platform naming v0.1.2"
git push
```

Then create a release:

```powershell
gh release create v0.1.2 --title "EchoDeck v0.1.2" --notes-file RELEASE_NOTES_v0.1.2.md release\*
```
