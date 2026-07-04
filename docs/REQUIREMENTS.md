# EchoDeck Requirements Baseline

## Vision

Build a polished local-first music desktop app for macOS that combines a modern dashboard player with vintage hi-fi themes. The app should play local music files with high-quality local audio controls while supporting legal, source-aware streaming embeds and future SDK integrations.

## MVP Requirements

### Local playback

- Import audio files.
- Import folders in the desktop app.
- Play local music from the user's Mac.
- Support common browser-decodable audio formats such as MP3, WAV, AAC/M4A, OGG, FLAC, and WebM where supported by the runtime.
- Preserve local files on the user's machine.
- Store track metadata locally.

### Player

- Play/pause.
- Previous/next.
- Seek.
- Volume.
- Shuffle.
- Repeat off/all/one.
- Favorite current track.
- OS/browser Media Session metadata where supported.

### Library

- Track list.
- Search by title, artist, source, and tags.
- Add to queue.
- Add next.
- Remove track.
- Export/import library JSON.

### Queue

- Current queue.
- Play selected queued item.
- Reorder up/down.
- Remove queue item.
- Clear queue.

### Playlists

- Create playlist.
- Save active queue to playlist.
- Play playlist.
- Delete playlist.

### Audio features

- 5-band EQ for local files.
- EQ presets.
- Crossfade setting for local files.
- Spectrum, waveform, and VU visualizations for local files.

### Themes

- Modern dark.
- Modern light.
- Vintage receiver.
- Cassette deck.

### Streaming MVP

- Add YouTube URL to library.
- Play YouTube using embedded iframe player.
- Add SoundCloud URL to library.
- Play SoundCloud using widget iframe.
- Launch external YouTube and SoundCloud searches.
- Do not extract, cache, download, or re-stream protected content.

## Post-MVP Requirements

### v0.2.0

- Better metadata extraction.
- Album artwork extraction.
- SQLite local database.
- Folder watcher.
- Duplicate detection.
- Real YouTube Data API search with user-provided API key.

### v0.3.0

- Spotify OAuth.
- Spotify search.
- Playlist import.
- Web Playback SDK integration where supported.
- Premium-required messaging.

### v0.4.0

- Apple Music MusicKit authorization.
- Apple Music catalog search.
- User library access.
- Apple Music playback where supported.

## Compliance Requirements

The app must not:

- Download YouTube videos or audio.
- Convert streaming content to MP3.
- Cache Spotify, Apple Music, YouTube, or SoundCloud audio.
- Bypass ads, branding, DRM, or required source player controls.
- Modify protected streaming audio.
- Re-host protected music.
- Use unofficial scraping APIs for production playback.

## Acceptance Criteria for v0.1.0

- User can run the app locally on macOS through Electron.
- User can import local files.
- User can import a folder in desktop mode.
- User can play local tracks.
- User can manage the queue.
- User can create a playlist and save the queue.
- User can use EQ presets on local playback.
- User can toggle visualizer modes.
- User can add and play a YouTube URL using an embed.
- User can add and play a SoundCloud URL using an embed.
- User can switch themes.
- User can export/import library metadata.
