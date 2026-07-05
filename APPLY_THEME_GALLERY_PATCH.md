# Apply EchoDeck v0.2.8 Theme Gallery Patch

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.8-theme-gallery-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

Open **Settings > Theme Gallery** to test the new gallery, presets, and Demo Mode.
