# Apply EchoDeck v0.1.1 Windows Build Patch

Extract this patch zip over your existing EchoDeck project folder.

PowerShell example:

```powershell
cd C:\docker\echodeck-macos-v0.1.0
Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.1.1-windows-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm run package:win

git status
git add .
git commit -m "Add Windows packaging for EchoDeck v0.1.1"
git push
```

Expected Windows build outputs are created in `release/`:

```text
EchoDeck-0.1.1-Windows-Setup.exe
EchoDeck-0.1.1-Windows-Portable.exe
```


## Fix Included

This patch removes the invalid root-level `build.zip` configuration from `package.json`. Electron Builder 24 rejects `build.zip`; macOS zip output remains supported through `build.mac.target`.
