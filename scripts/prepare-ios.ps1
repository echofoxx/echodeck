Write-Host "EchoDeck iOS scaffold preparation"
node scripts/ios-doctor.js
node scripts/prepare-ios.js
Write-Host ""
Write-Host "For actual iOS build, move to macOS with Xcode installed and run:"
Write-Host "npm run ios:add"
Write-Host "npm run ios:sync"
Write-Host "npm run ios:open"
