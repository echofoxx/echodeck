# Apply EchoDeck v0.3.0 iOS Scaffold Patch

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.3.0-ios-scaffold-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm run ios:doctor
npm run ios:prepare
npm start
```

Desktop build still works:

```powershell
npm run package:win
```

Actual iOS build requires macOS + Xcode:

```bash
npm run ios:add
npm run ios:sync
npm run ios:open
```
