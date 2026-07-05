# Apply EchoDeck v0.2.0 Streaming Sources MVP Patch

Apply this patch over your existing EchoDeck working folder.

## Windows PowerShell

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.0-streaming-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

## Build Windows installer and portable EXE

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

Expected outputs:

```text
release\EchoDeck-0.2.0-Windows-Setup.exe
release\EchoDeck-0.2.0-Windows-Portable.exe
```

## Commit and push

```powershell
git status
git add .
git commit -m "Release EchoDeck v0.2.0 streaming sources MVP"
git push
```

## Publish GitHub release

```powershell
gh release create v0.2.0 `
  --repo echofoxx/echodeck `
  --title "EchoDeck v0.2.0" `
  --notes-file RELEASE_NOTES_v0.2.0.md `
  release\EchoDeck-0.2.0-Windows-Setup.exe `
  release\EchoDeck-0.2.0-Windows-Portable.exe
```

If the release already exists:

```powershell
gh release upload v0.2.0 `
  --repo echofoxx/echodeck `
  release\EchoDeck-0.2.0-Windows-Setup.exe `
  release\EchoDeck-0.2.0-Windows-Portable.exe `
  --clobber
```
