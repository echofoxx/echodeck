# EchoDeck v0.1.0 Release Notes

Initial local-first macOS desktop MVP.

## Added

- Electron desktop shell for macOS-ready local app packaging
- Local audio file import and playback
- Playlist, queue, shuffle, repeat, favorites, and library management
- 5-band EQ for local files
- Crossfade preference for local files
- Spectrum, waveform, and VU visualizers
- Modern dark, modern light, vintage receiver, and cassette themes
- YouTube URL embed playback
- SoundCloud URL widget playback
- Spotify and Apple Music integration placeholders
- Import/export local library JSON
- macOS packaging scripts
- GitHub Actions workflow for macOS builds

## Known limitations

- Packaged binaries are not Apple-signed or notarized yet.
- Streaming EQ/visualizer/crossfade is not supported because third-party streams must remain inside official players/SDKs.
- YouTube search is currently external/launcher-style; v0.2.0 should add a YouTube Data API configuration screen.
