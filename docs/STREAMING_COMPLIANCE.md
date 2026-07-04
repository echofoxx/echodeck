# Streaming Compliance Notes

EchoDeck treats streaming sources as source-controlled playback surfaces.

## YouTube

Use embedded player playback and official API paths for metadata/search in future versions. Do not extract, download, cache, or convert YouTube audio or video.

## SoundCloud

Use the SoundCloud widget/embed approach for public URLs. Do not extract stream URLs or re-host audio.

## Spotify

Future Spotify support should use OAuth, Spotify Web API, and the Web Playback SDK where allowed. Do not intercept, modify, cache, or re-stream Spotify audio.

## Apple Music

Future Apple Music support should use MusicKit and Apple Music API with proper developer tokens and user authorization.

## Local files

Local files are the only source where EchoDeck should apply custom audio processing such as EQ, crossfade, gain routing, and visualizer analysis.
