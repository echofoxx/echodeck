# Apply EchoDeck v0.2.5 Mobile Preview Fix Patch

From PowerShell:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.5-mobile-preview-fix-patch.zip" "C:\docker\echodeck-macos-v0.1.0"
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
release\EchoDeck-0.2.5-Windows-Setup.exe
release\EchoDeck-0.2.5-Windows-Portable.exe
```
