# EchoDeck Streaming Sources MVP v0.2.0

## Purpose

EchoDeck v0.2.0 improves the local desktop app's ability to organize streaming music links without violating streaming-service restrictions. The app treats streaming sources as source-controlled playable references rather than raw audio files.

## Supported in v0.2.0

### YouTube

Supported URL types:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://music.youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/playlist?list=PLAYLIST_ID`

Playback method:

- Official embedded YouTube player path.

### SoundCloud

Supported URL types:

- Public SoundCloud track URLs
- Public SoundCloud set/playlist URLs
- Public artist/profile URLs

Playback method:

- SoundCloud widget embed path.

## Batch Import Format

Paste one URL per line.

Basic format:

```text
https://www.youtube.com/watch?v=VIDEO_ID
https://soundcloud.com/artist/track
```

Optional labeled format:

```text
Artist - Track Title | https://www.youtube.com/watch?v=VIDEO_ID
Playlist Name | https://www.youtube.com/playlist?list=PLAYLIST_ID
```

## Source-aware Behavior

Local files support:

- EQ
- Crossfade
- Visualizers
- Browser/OS media controls where supported

Streaming sources support:

- Library entries
- Queue entries
- Playlists
- Favorites
- Open original source link
- Copy source link
- Embedded/widget playback

Streaming sources do not support:

- EQ
- Crossfade
- Audio analysis visualizers
- Extracted audio streams
- Local caching of protected audio

## Future Streaming Roadmap

### v0.3.x Spotify

- OAuth setup guide
- App/client configuration screen
- Playlist metadata import
- Web Playback SDK proof of concept
- Premium/account limitation messaging

### v0.4.x Apple Music

- MusicKit setup guide
- Developer token flow notes
- Authorized catalog/library access
- MusicKit playback path
