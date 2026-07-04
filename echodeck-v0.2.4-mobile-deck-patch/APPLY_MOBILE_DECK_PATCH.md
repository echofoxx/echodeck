# Apply EchoDeck v0.2.4 Mobile Deck Modes Patch

From PowerShell:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.4-mobile-deck-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

Build Windows release assets:

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

Expected files:

```text
release\EchoDeck-0.2.4-Windows-Setup.exe
release\EchoDeck-0.2.4-Windows-Portable.exe
```

Publish:

```powershell
git status
git add .
git commit -m "Release EchoDeck v0.2.4 mobile deck modes"
git push

gh release create v0.2.4 `
  --repo echofoxx/echodeck `
  --title "EchoDeck v0.2.4" `
  --notes-file RELEASE_NOTES_v0.2.4.md `
  release\EchoDeck-0.2.4-Windows-Setup.exe `
  release\EchoDeck-0.2.4-Windows-Portable.exe
```
