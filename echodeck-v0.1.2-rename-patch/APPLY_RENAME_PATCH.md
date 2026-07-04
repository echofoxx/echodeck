# Apply EchoDeck v0.1.2 Rename Patch

This patch normalizes the project name from macOS-specific naming to **EchoDeck**.

## Apply over the existing folder

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.1.2-rename-patch.zip" "C:\docker\echodeck-macos-v0.1.0"
```

## Optional: rename the local folder

Close any running `npm start` session first.

```powershell
cd C:\docker
Rename-Item "C:\docker\echodeck-macos-v0.1.0" "EchoDeck"
cd C:\docker\EchoDeck
```

## Verify and build

```powershell
npm install
npm run lint:smoke
npm run package:win
```

## Commit and push

```powershell
git status
git add .
git commit -m "Normalize EchoDeck cross-platform naming v0.1.2"
git push
```

## Optional: rename GitHub repo

If you already created `echofoxx/echodeck-macos`, rename it:

```powershell
gh repo rename echodeck --repo echofoxx/echodeck-macos --yes
git remote set-url origin https://github.com/echofoxx/echodeck.git
```

If `echodeck` is unavailable, use `echodeck-desktop` instead.
