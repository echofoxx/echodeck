# Apply EchoDeck v0.2.9 Desktop Stabilization Patch

```powershell
cd C:\docker\echodeck-macos-v0.1.0

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.2.9-desktop-stabilization-patch.zip" "C:\docker\echodeck-macos-v0.1.0"

npm install
npm run lint:smoke
npm start
```

Then test:

- Settings > Demo Mode
- Settings > Desktop Release Tools
- Settings > Recently Played
- Settings > Theme Gallery
- Mobile Preview
- Full Screen Visualizer
