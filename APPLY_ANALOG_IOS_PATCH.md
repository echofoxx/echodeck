# Apply EchoDeck v0.2.3 Analog Cream + iOS Roadmap Patch

From PowerShell:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.3-analog-ios-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

Build Windows release assets:

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

Expected outputs:

```text
release\EchoDeck-0.2.3-Windows-Setup.exe
release\EchoDeck-0.2.3-Windows-Portable.exe
```

Publish:

```powershell
git status
git add .
git commit -m "Release EchoDeck v0.2.3 Analog Cream theme and iOS roadmap"
git push

gh release create v0.2.3 `
  --repo echofoxx/echodeck `
  --title "EchoDeck v0.2.3" `
  --notes-file RELEASE_NOTES_v0.2.3.md `
  release\EchoDeck-0.2.3-Windows-Setup.exe `
  release\EchoDeck-0.2.3-Windows-Portable.exe
```
