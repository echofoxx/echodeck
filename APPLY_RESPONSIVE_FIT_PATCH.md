# Apply EchoDeck v0.2.2 Responsive Fit Patch

Apply this patch over your existing EchoDeck repo.

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.2-responsive-fit-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

Build Windows outputs:

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```

Expected output:

```text
release\EchoDeck-0.2.2-Windows-Setup.exe
release\EchoDeck-0.2.2-Windows-Portable.exe
```

Commit and publish:

```powershell
git status
git add .
git commit -m "Release EchoDeck v0.2.2 responsive panel fit"
git push

gh release create v0.2.2 `
  --repo echofoxx/echodeck `
  --title "EchoDeck v0.2.2" `
  --notes-file RELEASE_NOTES_v0.2.2.md `
  release\EchoDeck-0.2.2-Windows-Setup.exe `
  release\EchoDeck-0.2.2-Windows-Portable.exe
```
