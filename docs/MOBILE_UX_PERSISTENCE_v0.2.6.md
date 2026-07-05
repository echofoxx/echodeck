# EchoDeck v0.2.6 — Mobile UX + Playback Persistence

This release turns Mobile Preview into a usable design target rather than a squeezed desktop view.

## Added

- Bottom tab bar in Mobile Preview
- Touch-sized library/queue actions
- Library source filter and sorting
- Queue save-as-playlist
- Clear queue confirmation
- Persistent last tab and library settings

## Persistence

EchoDeck stores app state in localStorage under `echodeck:v0.2.6`, while migrating earlier v0.2.x state when available.
