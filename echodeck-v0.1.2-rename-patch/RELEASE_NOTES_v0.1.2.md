# EchoDeck v0.1.2 — Cross-Platform Rename Release

EchoDeck v0.1.2 normalizes the project branding now that the app supports both Windows and macOS.

## Changed

- Product name standardized to **EchoDeck**.
- Package name changed from `echodeck-desktop` to `echodeck`.
- Recommended GitHub repository name changed from `echodeck-macos` / `echodeck-desktop` to `echodeck`.
- Documentation updated to use `C:\docker\EchoDeck` and `~/dev/EchoDeck` as preferred local folder names.
- App UI version label updated to v0.1.2.
- Windows and macOS build output names now use EchoDeck v0.1.2.
- Publishing scripts now default to the `echodeck` repository name.

## Fixed

- Removed remaining macOS-only wording from README and publishing scripts.
- Kept Windows and macOS as platform build targets rather than part of the product identity.
- Added `.gitattributes` so shell scripts keep LF line endings while Windows scripts keep CRLF-friendly behavior.

## Build outputs

Windows:

- `EchoDeck-0.1.2-Windows-Setup.exe`
- `EchoDeck-0.1.2-Windows-Portable.exe`

macOS:

- `EchoDeck-0.1.2-macOS.dmg`
- `EchoDeck-0.1.2-macOS.zip`
