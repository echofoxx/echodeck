# Apply EchoDeck v0.2.6 Patch

From PowerShell:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.6-mobile-ux-persistence-patch.zip" "C:\docker\echodeck-macos-v0.1.0"
npm install
npm run lint:smoke
npm start
```

Build Windows:

```powershell
Remove-Item -Recurse -Force release -ErrorAction SilentlyContinue
npm run package:win
```
