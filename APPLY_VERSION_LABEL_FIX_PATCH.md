# Apply EchoDeck v0.3.1 Version Label Fix Patch

```powershell
cd C:\docker\EchoDeck

Expand-Archive -Force "$env:USERPROFILE\Downloads\echodeck-v0.3.1-version-label-fix-patch.zip" "C:\docker\EchoDeck"

npm install
npm run lint:smoke
npm start
```

Expected visible label on Now Playing:

```text
v0.3.1 iOS Scaffold
```
