# Rename the Project to EchoDeck

EchoDeck is now a cross-platform desktop app for Windows and macOS. The product should no longer be named `echodeck-macos`.

## Recommended names

- Product/app: `EchoDeck`
- GitHub repo: `echodeck`
- Windows folder: `C:\docker\EchoDeck`
- macOS folder: `~/dev/EchoDeck`

## Rename the local Windows folder

Close any running `npm start` process first, then run:

```powershell
cd C:\docker
Rename-Item "C:\docker\echodeck-macos-v0.1.0" "EchoDeck"
cd C:\docker\EchoDeck
```

## Rename the GitHub repository

If you already created `echofoxx/echodeck-macos`, rename it with GitHub CLI:

```powershell
gh repo rename echodeck --repo echofoxx/echodeck-macos --yes
git remote set-url origin https://github.com/echofoxx/echodeck.git
```

If `echodeck` is unavailable, use `echodeck-desktop`:

```powershell
gh repo rename echodeck-desktop --repo echofoxx/echodeck-macos --yes
git remote set-url origin https://github.com/echofoxx/echodeck-desktop.git
```

## Commit the rename update

```powershell
git status
git add .
git commit -m "Normalize EchoDeck cross-platform naming v0.1.2"
git push
```

## Build after rename

```powershell
npm install
npm run lint:smoke
npm run package:win
```
