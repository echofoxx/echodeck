(() => {
  'use strict';

  const STORAGE_KEY = 'echodeck:v0.3.0';
  const LEGACY_STORAGE_KEYS = ['echodeck:v0.2.9', 'echodeck:v0.2.8', 'echodeck:v0.2.7', 'echodeck:v0.2.6', 'echodeck:v0.2.5', 'echodeck:v0.2.4', 'echodeck:v0.2.3', 'echodeck:v0.2.2', 'echodeck:v0.2.0', 'echodeck:v0.1.0'];
  const isElectron = Boolean(window.echoDeck?.isElectron);

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const els = {
    runtimeLabel: $('#runtimeLabel'),
    libraryCount: $('#libraryCount'),
    playlistCount: $('#playlistCount'),
    queueCount: $('#queueCount'),
    viewTitle: $('#viewTitle'),
    importFilesBtn: $('#importFilesBtn'),
    importFolderBtn: $('#importFolderBtn'),
    addStreamBtn: $('#addStreamBtn'),
    audioA: $('#audioA'),
    audioB: $('#audioB'),
    recordDisc: $('#recordDisc'),
    canvas: $('#visualizerCanvas'),
    currentSource: $('#currentSource'),
    currentTitle: $('#currentTitle'),
    currentArtist: $('#currentArtist'),
    currentTime: $('#currentTime'),
    durationTime: $('#durationTime'),
    seekRange: $('#seekRange'),
    playBtn: $('#playBtn'),
    prevBtn: $('#prevBtn'),
    nextBtn: $('#nextBtn'),
    shuffleBtn: $('#shuffleBtn'),
    repeatBtn: $('#repeatBtn'),
    favoriteBtn: $('#favoriteBtn'),
    volumeRange: $('#volumeRange'),
    volumeLabel: $('#volumeLabel'),
    capabilityNote: $('#capabilityNote'),
    queueList: $('#queueList'),
    clearQueueBtn: $('#clearQueueBtn'),
    saveQueueBtn: $('#saveQueueBtn'),
    embedPanel: $('#embedPanel'),
    embedTitle: $('#embedTitle'),
    embedHost: $('#embedHost'),
    closeEmbedBtn: $('#closeEmbedBtn'),
    librarySearch: $('#librarySearch'),
    librarySourceFilter: $('#librarySourceFilter'),
    librarySort: $('#librarySort'),
    librarySummary: $('#librarySummary'),
    browserFileBtn: $('#browserFileBtn'),
    browserFileInput: $('#browserFileInput'),
    exportLibraryBtn: $('#exportLibraryBtn'),
    importLibraryBtn: $('#importLibraryBtn'),
    importLibraryInput: $('#importLibraryInput'),
    libraryTable: $('#libraryTable'),
    newPlaylistBtn: $('#newPlaylistBtn'),
    playlistGrid: $('#playlistGrid'),
    youtubeUrl: $('#youtubeUrl'),
    soundcloudUrl: $('#soundcloudUrl'),
    externalSearch: $('#externalSearch'),
    searchYoutubeBtn: $('#searchYoutubeBtn'),
    searchSoundCloudBtn: $('#searchSoundCloudBtn'),
    spotifyPlanBtn: $('#spotifyPlanBtn'),
    applePlanBtn: $('#applePlanBtn'),
    eqBank: $('#eqBank'),
    presetRow: $('#presetRow'),
    resetEqBtn: $('#resetEqBtn'),
    crossfadeToggle: $('#crossfadeToggle'),
    crossfadeRange: $('#crossfadeRange'),
    crossfadeLabel: $('#crossfadeLabel'),
    visualModeButtons: $('#visualModeButtons'),
    openFullVisualizerBtn: $('#openFullVisualizerBtn'),
    fullVisualizerBtn: $('#fullVisualizerBtn'),
    closeFullVisualizerBtn: $('#closeFullVisualizerBtn'),
    visualizerOverlay: $('#visualizerOverlay'),
    fullscreenCanvas: $('#fullscreenVisualizerCanvas'),
    visualizerOverlayTitle: $('#visualizerOverlayTitle'),
    visualizerOverlaySubtitle: $('#visualizerOverlaySubtitle'),
    themeOptions: $('#themeOptions'),
    themeGallery: $('#themeGallery'),
    themePresetGrid: $('#themePresetGrid'),
    enableDemoModeBtn: $('#enableDemoModeBtn'),
    clearDemoModeBtn: $('#clearDemoModeBtn'),
    deckModeStrip: $('.deck-mode-strip'),
    deckModeOptions: $('#deckModeOptions'),
    mobilePreviewBtn: $('#mobilePreviewBtn'),
    exportSettingsBtn: $('#exportSettingsBtn'),
    resetAppBtn: $('#resetAppBtn'),
    clearLibraryBtn: $('#clearLibraryBtn'),
    duplicateScanBtn: $('#duplicateScanBtn'),
    recentlyPlayedList: $('#recentlyPlayedList'),
    streamDialog: $('#streamDialog'),
    genericStreamUrl: $('#genericStreamUrl'),
    streamTitle: $('#streamTitle'),
    streamArtist: $('#streamArtist'),
    confirmStreamAdd: $('#confirmStreamAdd'),
    bulkStreamUrls: $('#bulkStreamUrls'),
    importStreamListBtn: $('#importStreamListBtn'),
    clearStreamListBtn: $('#clearStreamListBtn'),
    streamIntakeSummary: $('#streamIntakeSummary'),
    sourceStats: $('#sourceStats'),
    openCurrentSourceBtn: $('#openCurrentSourceBtn'),
    copyCurrentSourceBtn: $('#copyCurrentSourceBtn'),
    infoDialog: $('#infoDialog'),
    infoTitle: $('#infoTitle'),
    infoText: $('#infoText'),
    emptyTemplate: $('#emptyStateTemplate')
  };

  const EQ_BANDS = [
    { label: '60Hz', frequency: 60, type: 'lowshelf' },
    { label: '250Hz', frequency: 250, type: 'peaking' },
    { label: '1kHz', frequency: 1000, type: 'peaking' },
    { label: '4kHz', frequency: 4000, type: 'peaking' },
    { label: '12kHz', frequency: 12000, type: 'highshelf' }
  ];

  const EQ_PRESETS = {
    Flat: [0, 0, 0, 0, 0],
    'Bass Boost': [6, 4, 0, 0, 1],
    Vocal: [-1, 1, 5, 3, 0],
    Rock: [4, 3, -1, 3, 5],
    Jazz: [2, 2, 1, 3, 4],
    'Lo‑Fi': [4, 2, -2, -1, -3]
  };

  const THEME_GALLERY = [
    { id: 'analog-cream', name: 'Analog Cream', deck: 'turntable', use: 'Retro mobile / vinyl', colors: ['#f8e8ca', '#d95f13', '#251a12'] },
    { id: 'studio-white', name: 'Studio White', deck: 'mini', use: 'Clean mobile / LCD', colors: ['#f7f8fa', '#737784', '#e74a46'] },
    { id: 'modern-dark', name: 'Modern Dark', deck: 'visualizer', use: 'Desktop / visualizer', colors: ['#0b1020', '#8b5cf6', '#06b6d4'] },
    { id: 'modern-light', name: 'Modern Light', deck: 'classic', use: 'Clean workspace', colors: ['#f8fafc', '#6d28d9', '#0284c7'] },
    { id: 'vintage', name: 'Vintage Receiver', deck: 'equalizer', use: 'Hi‑fi dashboard', colors: ['#21170d', '#f59e0b', '#14b8a6'] },
    { id: 'cassette', name: 'Cassette Deck', deck: 'cassette', use: 'Tape / mixtape view', colors: ['#101012', '#ec4899', '#22d3ee'] }
  ];

  const THEME_PRESETS = [
    { id: 'analog-turntable', name: 'Analog Turntable', theme: 'analog-cream', deck: 'turntable', visual: 'radial' },
    { id: 'studio-mini', name: 'Studio Mini LCD', theme: 'studio-white', deck: 'mini', visual: 'wave' },
    { id: 'dark-visualizer', name: 'Dark Visualizer', theme: 'modern-dark', deck: 'visualizer', visual: 'orbit' },
    { id: 'vintage-eq', name: 'Vintage EQ', theme: 'vintage', deck: 'equalizer', visual: 'vu' },
    { id: 'cassette-mixtape', name: 'Cassette Mixtape', theme: 'cassette', deck: 'cassette', visual: 'bars' }
  ];

  const defaultState = () => ({
    library: [],
    playlists: [
      {
        id: crypto.randomUUID(),
        name: 'Demo Queue',
        description: 'A starter playlist you can replace with your own tracks.',
        trackIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    queue: [],
    queueIndex: -1,
    settings: {
      schemaVersion: '0.3.0',
      theme: 'analog-cream',
      volume: 0.85,
      shuffle: false,
      repeatMode: 'off',
      crossfadeEnabled: false,
      crossfadeSeconds: 3,
      visualMode: 'bars',
      eq: [0, 0, 0, 0, 0],
      eqPreset: 'Flat',
      deckMode: 'classic',
      mobilePreview: false,
      lastView: 'now',
      libraryFilter: 'all',
      librarySort: 'recent',
      resumeOnLaunch: true,
      demoMode: false,
      recentlyPlayed: []
    }
  });

  let state = loadState();
  let audioContext = null;
  let sourceNode = null;
  let filters = [];
  let gainNode = null;
  let analyser = null;
  let animationId = null;
  let visualizerClock = 0;
  let activeAudio = els.audioA;
  let standbyAudio = els.audioB;
  let isPlaying = false;
  let isSeeking = false;
  let crossfadeStartedForTrack = false;
  let sessionObjectUrls = new Map();

  function loadState() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        for (const key of LEGACY_STORAGE_KEYS) {
          raw = localStorage.getItem(key);
          if (raw) break;
        }
      }
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const merged = defaultState();
      return {
        ...merged,
        ...parsed,
        settings: { ...merged.settings, ...(parsed.settings || {}) },
        library: Array.isArray(parsed.library) ? parsed.library : [],
        playlists: Array.isArray(parsed.playlists) ? parsed.playlists : merged.playlists,
        queue: Array.isArray(parsed.queue) ? parsed.queue : [],
        queueIndex: Number.isInteger(parsed.queueIndex) ? parsed.queueIndex : -1
      };
    } catch (error) {
      console.warn('Could not load saved state', error);
      return defaultState();
    }
  }

  function saveState() {
    const serializable = {
      ...state,
      library: state.library.map(track => ({ ...track, objectUrl: undefined, fileObject: undefined }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  }

  function setState(mutator) {
    mutator(state);
    saveState();
    render();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function filePathToUrl(filePath) {
    if (!filePath) return '';
    const normalized = filePath.replace(/\\/g, '/');
    const prefixed = normalized.startsWith('/') ? normalized : `/${normalized}`;
    return `file://${prefixed.split('/').map((segment, index) => index === 0 ? segment : encodeURIComponent(segment)).join('/')}`;
  }

  function getTrack(id) {
    return state.library.find(track => track.id === id) || null;
  }

  function currentTrack() {
    const id = state.queue[state.queueIndex];
    return id ? getTrack(id) : null;
  }

  function sourceLabel(track) {
    if (!track) return 'No Source';
    if (track.sourceType === 'youtube') return 'YouTube Embed';
    if (track.sourceType === 'youtube-playlist') return 'YouTube Playlist Embed';
    if (track.sourceType === 'soundcloud') return 'SoundCloud Widget';
    if (track.sourceType === 'local') return track.filePath ? 'Local File' : 'Browser Session File';
    return track.sourceType || 'Unknown';
  }

  function trackPlayableUrl(track) {
    if (!track) return '';
    if (track.objectUrl) return track.objectUrl;
    if (track.filePath) return filePathToUrl(track.filePath);
    return '';
  }

  function dedupeAddTracks(tracks) {
    if (!tracks.length) return;
    const existingIds = new Set(state.library.map(track => track.id));
    const newTracks = tracks.filter(track => !existingIds.has(track.id));
    setState(draft => {
      draft.library.push(...newTracks);
      if (draft.queue.length === 0) {
        draft.queue.push(...newTracks.map(track => track.id));
        draft.queueIndex = newTracks.length ? 0 : draft.queueIndex;
      }
    });
    if (newTracks.length && state.queueIndex === 0 && !currentTrack()) {
      playTrackById(newTracks[0].id);
    }
    toast(`${newTracks.length} track${newTracks.length === 1 ? '' : 's'} imported`);
  }

  async function importElectronFiles() {
    if (!isElectron) {
      els.browserFileInput.click();
      return;
    }
    const tracks = await window.echoDeck.selectAudioFiles();
    dedupeAddTracks(tracks);
  }

  async function importElectronFolder() {
    if (!isElectron) {
      toast('Folder import is available in the desktop app. Use Browser File Import here.');
      return;
    }
    const tracks = await window.echoDeck.selectMusicFolder();
    dedupeAddTracks(tracks);
  }

  function importBrowserFiles(fileList) {
    const tracks = Array.from(fileList || [])
      .filter(file => file.type.startsWith('audio/') || /\.(mp3|wav|m4a|aac|ogg|oga|flac|webm)$/i.test(file.name))
      .map(file => {
        const objectUrl = URL.createObjectURL(file);
        const id = `browser-${file.name}-${file.size}-${file.lastModified}`;
        sessionObjectUrls.set(id, objectUrl);
        const cleanName = file.name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').replace(/[-]+/g, ' - ');
        let artist = 'Browser Session';
        let title = cleanName;
        if (cleanName.includes(' - ')) {
          const parts = cleanName.split(' - ');
          artist = parts.shift().trim() || artist;
          title = parts.join(' - ').trim() || title;
        }
        return {
          id,
          sourceType: 'local',
          title,
          artist,
          album: '',
          duration: null,
          objectUrl,
          fileName: file.name,
          fileSize: file.size,
          createdAt: new Date().toISOString(),
          tags: ['local', 'browser-session'],
          favorite: false,
          playCount: 0,
          lastPlayedAt: null
        };
      });
    dedupeAddTracks(tracks);
  }

  function safeBase64Url(value) {
    return btoa(unescape(encodeURIComponent(value))).replace(/=+$/, '').replace(/[+/]/g, '-');
  }

  function parseYouTubeId(url) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtu.be')) return parsed.pathname.split('/').filter(Boolean)[0];
      if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
      const shorts = parsed.pathname.match(/\/shorts\/([^/?]+)/);
      if (shorts) return shorts[1];
      const embed = parsed.pathname.match(/\/embed\/([^/?]+)/);
      if (embed) return embed[1];
    } catch (error) {
      return '';
    }
    return '';
  }

  function parseYouTubePlaylistId(url) {
    try {
      const parsed = new URL(url);
      return parsed.searchParams.get('list') || '';
    } catch (error) {
      return '';
    }
  }

  function inferLabelParts(label) {
    const clean = String(label || '').trim().replace(/^[-–—|:]+|[-–—|:]+$/g, '').trim();
    if (!clean) return {};
    const splitters = [' - ', ' – ', ' — ', ' | '];
    for (const splitter of splitters) {
      if (clean.includes(splitter)) {
        const parts = clean.split(splitter).map(part => part.trim()).filter(Boolean);
        if (parts.length >= 2) return { artist: parts.shift(), title: parts.join(splitter).trim() };
      }
    }
    return { title: clean };
  }

  function parseStreamingLine(rawLine) {
    const line = String(rawLine || '').trim();
    if (!line || line.startsWith('#')) return null;
    const match = line.match(/https?:\/\/\S+/i);
    if (!match) throw new Error(`No URL found in: ${line.slice(0, 80)}`);
    const url = match[0].replace(/[),.;]+$/g, '');
    const before = line.slice(0, match.index).replace(/[-–—|:]+$/g, '').trim();
    const after = line.slice(match.index + match[0].length).replace(/^[-–—|:]+/g, '').trim();
    return { url, ...inferLabelParts(before || after) };
  }

  function streamingTrackFromUrl(rawUrl, metadata = {}) {
    const url = rawUrl.trim();
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be') || lower.includes('music.youtube.com')) {
      const videoId = parseYouTubeId(url);
      const playlistId = parseYouTubePlaylistId(url);
      if (!videoId && playlistId) {
        return {
          id: `youtube-playlist-${playlistId}`,
          sourceType: 'youtube-playlist',
          sourceUrl: url,
          sourceId: playlistId,
          title: metadata.title || `YouTube Playlist ${playlistId}`,
          artist: metadata.artist || 'YouTube',
          album: '',
          duration: null,
          artworkUrl: '',
          createdAt: new Date().toISOString(),
          tags: ['youtube', 'playlist', 'streaming'],
          favorite: false,
          playCount: 0,
          lastPlayedAt: null
        };
      }
      if (!videoId) throw new Error('Could not read a YouTube video or playlist ID from that URL.');
      return {
        id: `youtube-${videoId}`,
        sourceType: 'youtube',
        sourceUrl: url,
        sourceId: videoId,
        title: metadata.title || `YouTube Track ${videoId}`,
        artist: metadata.artist || 'YouTube',
        album: '',
        duration: null,
        artworkUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        createdAt: new Date().toISOString(),
        tags: ['youtube', playlistId ? 'playlist-context' : null, 'streaming'].filter(Boolean),
        favorite: false,
        playCount: 0,
        lastPlayedAt: null
      };
    }
    if (lower.includes('soundcloud.com')) {
      return {
        id: `soundcloud-${safeBase64Url(url)}`,
        sourceType: 'soundcloud',
        sourceUrl: url,
        sourceId: url,
        title: metadata.title || 'SoundCloud Track',
        artist: metadata.artist || 'SoundCloud',
        album: '',
        duration: null,
        artworkUrl: '',
        createdAt: new Date().toISOString(),
        tags: ['soundcloud', 'streaming'],
        favorite: false,
        playCount: 0,
        lastPlayedAt: null
      };
    }
    throw new Error('This release supports YouTube video/playlist URLs and SoundCloud URLs. Spotify and Apple Music are planned SDK integrations.');
  }

  function addStreamingTracks(tracks) {
    const incoming = tracks.filter(Boolean);
    if (!incoming.length) return;
    let added = 0;
    let queued = 0;
    setState(draft => {
      const existingIds = new Set(draft.library.map(track => track.id));
      const queueIds = new Set(draft.queue);
      for (const track of incoming) {
        if (!existingIds.has(track.id)) {
          draft.library.push(track);
          existingIds.add(track.id);
          added += 1;
        }
        if (!queueIds.has(track.id)) {
          draft.queue.push(track.id);
          queueIds.add(track.id);
          queued += 1;
        }
      }
      if (draft.queueIndex < 0 && draft.queue.length) draft.queueIndex = 0;
    });
    toast(`${added} new source${added === 1 ? '' : 's'} added · ${queued} queued`);
  }

  function addStreamingUrl(url, metadata = {}) {
    try {
      const track = streamingTrackFromUrl(url, metadata);
      addStreamingTracks([track]);
    } catch (error) {
      toast(error.message);
    }
  }

  function addStreamingList(rawText) {
    const lines = String(rawText || '').split(/\r?\n/);
    const tracks = [];
    const errors = [];
    for (const line of lines) {
      try {
        const parsed = parseStreamingLine(line);
        if (!parsed) continue;
        tracks.push(streamingTrackFromUrl(parsed.url, parsed));
      } catch (error) {
        errors.push(error.message);
      }
    }
    addStreamingTracks(tracks);
    if (els.streamIntakeSummary) {
      els.streamIntakeSummary.textContent = errors.length
        ? `Imported ${tracks.length}; skipped ${errors.length}. First issue: ${errors[0]}`
        : `Imported ${tracks.length} supported streaming URL${tracks.length === 1 ? '' : 's'} into the library and queue.`;
    }
    if (errors.length) toast(`Skipped ${errors.length} unsupported line${errors.length === 1 ? '' : 's'}.`);
  }

  function buildEmbed(track) {
    if (!track) return '';
    if (track.sourceType === 'youtube') {
      return `<iframe title="YouTube player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen src="https://www.youtube.com/embed/${encodeURIComponent(track.sourceId)}?autoplay=1&rel=0"></iframe>`;
    }
    if (track.sourceType === 'youtube-playlist') {
      return `<iframe title="YouTube playlist player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen src="https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(track.sourceId)}&autoplay=1&rel=0"></iframe>`;
    }
    if (track.sourceType === 'soundcloud') {
      const encoded = encodeURIComponent(track.sourceUrl);
      return `<iframe title="SoundCloud player" allow="autoplay" scrolling="no" src="https://w.soundcloud.com/player/?url=${encoded}&auto_play=true&visual=true"></iframe>`;
    }
    return '';
  }

  function ensureAudioGraph() {
    if (audioContext) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      toast('Web Audio API is not available in this environment.');
      return;
    }
    audioContext = new AudioCtx();
    sourceNode = audioContext.createMediaElementSource(activeAudio);
    filters = EQ_BANDS.map((band, index) => {
      const filter = audioContext.createBiquadFilter();
      filter.type = band.type;
      filter.frequency.value = band.frequency;
      filter.Q.value = 1;
      filter.gain.value = state.settings.eq[index] || 0;
      return filter;
    });
    gainNode = audioContext.createGain();
    gainNode.gain.value = state.settings.volume;
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    let node = sourceNode;
    for (const filter of filters) {
      node.connect(filter);
      node = filter;
    }
    node.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  function applyEq(values = state.settings.eq) {
    filters.forEach((filter, index) => {
      filter.gain.setTargetAtTime(Number(values[index] || 0), audioContext?.currentTime || 0, 0.015);
    });
  }

  function setVolume(value) {
    const volume = Number(value);
    activeAudio.volume = volume;
    standbyAudio.volume = volume;
    if (gainNode && audioContext) gainNode.gain.setTargetAtTime(volume, audioContext.currentTime, 0.015);
    setState(draft => { draft.settings.volume = volume; });
  }

  async function playCurrent() {
    const track = currentTrack();
    if (!track) {
      toast('Import or queue a track first.');
      return;
    }
    if (track.sourceType !== 'local') {
      activeAudio.pause();
      standbyAudio.pause();
      isPlaying = true;
    recordRecentlyPlayed(currentTrack());
      els.embedTitle.textContent = track.title;
      els.embedHost.innerHTML = buildEmbed(track);
      els.embedPanel.classList.remove('hidden');
      updateTrackPlayed(track.id);
      updateNowPlaying(track);
      renderQueue();
      return;
    }

    els.embedPanel.classList.add('hidden');
    els.embedHost.innerHTML = '';
    ensureAudioGraph();
    if (audioContext?.state === 'suspended') await audioContext.resume();

    const url = trackPlayableUrl(track);
    if (!url) {
      toast('This browser-session file is no longer available. Re-import it to play.');
      return;
    }
    if (activeAudio.src !== url) {
      activeAudio.src = url;
      crossfadeStartedForTrack = false;
    }
    activeAudio.volume = state.settings.volume;
    try {
      await activeAudio.play();
      isPlaying = true;
      updateTrackPlayed(track.id);
      startVisualizer();
      updateNowPlaying(track);
    } catch (error) {
      console.error(error);
      toast('Could not start playback. Try importing the file again.');
    }
  }

  function pauseCurrent() {
    activeAudio.pause();
    standbyAudio.pause();
    isPlaying = false;
    renderPlaybackState();
  }

  function togglePlay() {
    if (isPlaying && !activeAudio.paused) pauseCurrent();
    else playCurrent();
  }

  function updateTrackPlayed(trackId) {
    const track = getTrack(trackId);
    if (!track) return;
    track.playCount = (track.playCount || 0) + 1;
    track.lastPlayedAt = new Date().toISOString();
    saveState();
  }

  function playTrackById(trackId) {
    setState(draft => {
      if (!draft.queue.includes(trackId)) draft.queue.push(trackId);
      draft.queueIndex = draft.queue.indexOf(trackId);
    });
    playCurrent();
  }

  function addToQueue(trackId, playNext = false) {
    setState(draft => {
      if (playNext && draft.queueIndex >= 0) draft.queue.splice(draft.queueIndex + 1, 0, trackId);
      else draft.queue.push(trackId);
      if (draft.queueIndex < 0) draft.queueIndex = 0;
    });
    toast(playNext ? 'Added to play next' : 'Added to queue');
  }

  function nextIndex() {
    if (!state.queue.length) return -1;
    if (state.settings.shuffle) {
      if (state.queue.length === 1) return 0;
      let next = state.queueIndex;
      while (next === state.queueIndex) next = Math.floor(Math.random() * state.queue.length);
      return next;
    }
    if (state.queueIndex < state.queue.length - 1) return state.queueIndex + 1;
    if (state.settings.repeatMode === 'all') return 0;
    return -1;
  }

  function prevIndex() {
    if (!state.queue.length) return -1;
    if (activeAudio.currentTime > 4) {
      activeAudio.currentTime = 0;
      return state.queueIndex;
    }
    if (state.queueIndex > 0) return state.queueIndex - 1;
    if (state.settings.repeatMode === 'all') return state.queue.length - 1;
    return -1;
  }

  function nextTrack() {
    if (state.settings.repeatMode === 'one' && currentTrack()?.sourceType === 'local') {
      activeAudio.currentTime = 0;
      playCurrent();
      return;
    }
    const idx = nextIndex();
    if (idx < 0) {
      pauseCurrent();
      return;
    }
    setState(draft => { draft.queueIndex = idx; });
    playCurrent();
  }

  function prevTrack() {
    const idx = prevIndex();
    if (idx < 0) return;
    setState(draft => { draft.queueIndex = idx; });
    playCurrent();
  }

  async function performCrossfade() {
    if (crossfadeStartedForTrack || !state.settings.crossfadeEnabled || state.settings.crossfadeSeconds <= 0) return;
    const next = nextIndex();
    if (next < 0 || next === state.queueIndex) return;
    const nextTrackData = getTrack(state.queue[next]);
    if (!nextTrackData || nextTrackData.sourceType !== 'local') return;
    const nextUrl = trackPlayableUrl(nextTrackData);
    if (!nextUrl) return;

    crossfadeStartedForTrack = true;
    standbyAudio.src = nextUrl;
    standbyAudio.volume = 0;
    try {
      await standbyAudio.play();
    } catch (error) {
      return;
    }

    const duration = Math.max(0.5, state.settings.crossfadeSeconds);
    const startedAt = performance.now();
    const startVol = state.settings.volume;
    const fade = () => {
      const progress = Math.min(1, (performance.now() - startedAt) / (duration * 1000));
      activeAudio.volume = startVol * (1 - progress);
      standbyAudio.volume = startVol * progress;
      if (progress < 1) requestAnimationFrame(fade);
      else {
        const handoffTime = standbyAudio.currentTime || 0;
        standbyAudio.pause();
        activeAudio.pause();
        activeAudio.src = nextUrl;
        activeAudio.volume = startVol;
        activeAudio.currentTime = handoffTime;
        activeAudio.play().catch(() => {});
        standbyAudio.currentTime = 0;
        setState(draft => { draft.queueIndex = next; });
        crossfadeStartedForTrack = false;
        updateTrackPlayed(nextTrackData.id);
        updateNowPlaying(nextTrackData);
        ensureMediaSession(nextTrackData);
      }
    };
    fade();
  }

  function updateNowPlaying(track) {
    els.currentSource.textContent = sourceLabel(track);
    els.currentTitle.textContent = track?.title || 'Drop music files to begin';
    els.currentArtist.textContent = track?.artist || 'EchoDeck local-first player';
    window.requestAnimationFrame(fitNowPlayingText);
    els.capabilityNote.textContent = track?.sourceType === 'local'
      ? 'EQ, crossfade, and visualizers are active for this local source.'
      : 'This streaming source uses an official embed/widget. EQ, audio analysis, and crossfade are disabled for this source.';
    ensureMediaSession(track);
    renderPlaybackState();
  }

  function ensureMediaSession(track) {
    if (!('mediaSession' in navigator) || !track) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album || 'EchoDeck',
        artwork: track.artworkUrl ? [{ src: track.artworkUrl, sizes: '512x512', type: 'image/png' }] : []
      });
      navigator.mediaSession.setActionHandler('play', playCurrent);
      navigator.mediaSession.setActionHandler('pause', pauseCurrent);
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    } catch (error) {
      // Media Session support differs by runtime. Non-fatal.
    }
  }

  function renderPlaybackState() {
    const track = currentTrack();
    const streaming = Boolean(track && track.sourceType !== 'local');
    const localPlaying = isPlaying && !activeAudio.paused;
    els.playBtn.textContent = localPlaying || (isPlaying && streaming) ? '⏸' : '▶';
    els.recordDisc.classList.toggle('playing', localPlaying || (isPlaying && streaming));
    els.shuffleBtn.classList.toggle('active', state.settings.shuffle);
    els.repeatBtn.classList.toggle('active', state.settings.repeatMode !== 'off');
    els.repeatBtn.textContent = state.settings.repeatMode === 'one' ? '↺1' : '↻';
    els.favoriteBtn.textContent = track?.favorite ? '♥' : '♡';
    els.favoriteBtn.classList.toggle('active', Boolean(track?.favorite));
    els.seekRange.disabled = streaming || !track;
    if (streaming) {
      els.seekRange.value = '0';
      els.currentTime.textContent = 'Embed';
      els.durationTime.textContent = 'Source';
    }
  }

  function startVisualizer() {
    if (animationId) cancelAnimationFrame(animationId);
    const inlineCtx = els.canvas.getContext('2d');
    const fullscreenCtx = els.fullscreenCanvas?.getContext('2d');
    const draw = () => {
      animationId = requestAnimationFrame(draw);
      visualizerClock += 0.016;

      syncCanvasSize(els.canvas, inlineCtx);
      drawVisualization(inlineCtx, els.canvas.width, els.canvas.height, state.settings.visualMode, false);

      if (els.visualizerOverlay && !els.visualizerOverlay.classList.contains('hidden') && fullscreenCtx) {
        syncCanvasSize(els.fullscreenCanvas, fullscreenCtx);
        drawVisualization(fullscreenCtx, els.fullscreenCanvas.width, els.fullscreenCanvas.height, state.settings.visualMode, true);
      }
    };
    draw();
  }

  function syncCanvasSize(canvas, ctx) {
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(320, Math.floor(canvas.clientWidth * ratio));
    const height = Math.max(180, Math.floor(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  function drawVisualization(ctx, width, height, mode, large = false) {
    ctx.clearRect(0, 0, width, height);
    if (mode === 'off') return;

    const hasLiveAudio = Boolean(analyser && currentTrack()?.sourceType === 'local' && !activeAudio.paused);
    const frequency = new Uint8Array(analyser?.frequencyBinCount || 512);
    const timeDomain = new Uint8Array(analyser?.fftSize || 1024);

    if (analyser) {
      analyser.getByteFrequencyData(frequency);
      analyser.getByteTimeDomainData(timeDomain);
    } else {
      synthesizeAmbientData(frequency, timeDomain);
    }

    if (!hasLiveAudio) synthesizeAmbientData(frequency, timeDomain, 0.45);

    if (mode === 'wave') return drawWave(ctx, width, height, timeDomain, large);
    if (mode === 'vu') return drawVu(ctx, width, height, frequency, large);
    if (mode === 'radial') return drawRadial(ctx, width, height, frequency, large);
    if (mode === 'orbit') return drawOrbit(ctx, width, height, frequency, large);
    drawBars(ctx, width, height, frequency, large);
  }

  function synthesizeAmbientData(frequency, timeDomain, intensity = 1) {
    for (let i = 0; i < frequency.length; i++) {
      const pulse = Math.sin(visualizerClock * 2 + i * 0.09) * 0.5 + 0.5;
      const drift = Math.sin(visualizerClock * 0.7 + i * 0.027) * 0.5 + 0.5;
      frequency[i] = Math.floor((18 + pulse * 70 + drift * 32) * intensity);
    }
    for (let i = 0; i < timeDomain.length; i++) {
      timeDomain[i] = Math.floor(128 + Math.sin(i * 0.04 + visualizerClock * 4) * 42 * intensity + Math.sin(i * 0.013 + visualizerClock) * 18 * intensity);
    }
  }

  function drawBars(ctx, width, height, data, large) {
    const bars = large ? 128 : 72;
    const step = Math.max(1, Math.floor(data.length / bars));
    const barWidth = width / bars;
    ctx.fillStyle = gradient(ctx, width);
    for (let i = 0; i < bars; i++) {
      const value = data[i * step] / 255;
      const barHeight = Math.max(large ? 8 : 4, value * height * (large ? 0.82 : 0.9));
      const x = i * barWidth;
      const y = height - barHeight;
      roundRect(ctx, x, y, Math.max(2, barWidth - (large ? 4 : 3)), barHeight, large ? 8 : 4);
      ctx.fill();
    }
  }

  function drawWave(ctx, width, height, data, large) {
    ctx.lineWidth = large ? 5 : 3;
    ctx.strokeStyle = gradient(ctx, width);
    ctx.beginPath();
    const slice = width / data.length;
    data.forEach((value, i) => {
      const x = i * slice;
      const y = (value / 255) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    if (large) {
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 12;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function drawVu(ctx, width, height, data, large) {
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const level = Math.min(1, avg / 180);
    const rows = large ? 6 : 2;
    const gap = large ? 22 : 24;
    const meterHeight = large ? Math.max(28, height * 0.055) : 20;
    const startY = height / 2 - ((rows * meterHeight + (rows - 1) * gap) / 2);
    for (let i = 0; i < rows; i++) {
      const y = startY + i * (meterHeight + gap);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      roundRect(ctx, width * 0.08, y, width * 0.84, meterHeight, meterHeight / 2);
      ctx.fill();
      const rowLevel = Math.min(1, level * (0.72 + i * 0.07) + Math.sin(visualizerClock * 3 + i) * 0.04);
      ctx.fillStyle = gradient(ctx, width);
      roundRect(ctx, width * 0.08, y, width * 0.84 * rowLevel, meterHeight, meterHeight / 2);
      ctx.fill();
    }
  }

  function drawRadial(ctx, width, height, data, large) {
    const cx = width / 2;
    const cy = height / 2;
    const baseRadius = Math.min(width, height) * (large ? 0.18 : 0.2);
    const bars = large ? 160 : 96;
    const step = Math.max(1, Math.floor(data.length / bars));
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = gradient(ctx, width);
    ctx.lineCap = 'round';
    for (let i = 0; i < bars; i++) {
      const value = data[i * step] / 255;
      const angle = (Math.PI * 2 * i) / bars + visualizerClock * 0.12;
      const inner = baseRadius;
      const outer = baseRadius + value * Math.min(width, height) * (large ? 0.28 : 0.23);
      ctx.lineWidth = large ? 4 : 3;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = gradient(ctx, width);
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius * (1.08 + Math.sin(visualizerClock * 2) * 0.03), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawOrbit(ctx, width, height, data, large) {
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.min(width, height) * 0.42;
    const avg = data.reduce((a, b) => a + b, 0) / data.length / 255;
    ctx.save();
    ctx.translate(cx, cy);
    for (let ring = 0; ring < (large ? 7 : 5); ring++) {
      const radius = maxR * (0.18 + ring * 0.105) * (1 + avg * 0.12);
      ctx.strokeStyle = gradient(ctx, width);
      ctx.globalAlpha = 0.16 + ring * 0.08;
      ctx.lineWidth = large ? 2.5 : 1.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * (1 + ring * 0.02), radius * (0.48 + ring * 0.05), visualizerClock * (0.12 + ring * 0.03), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < (large ? 36 : 20); i++) {
      const value = data[(i * 13) % data.length] / 255;
      const angle = visualizerClock * (0.55 + (i % 5) * 0.08) + i * 0.72;
      const radius = maxR * (0.18 + ((i % 9) / 10) * 0.75);
      const size = (large ? 6 : 4) + value * (large ? 18 : 11);
      ctx.fillStyle = gradient(ctx, width);
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * radius, Math.sin(angle * 0.92) * radius * 0.72, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function gradient(ctx, width) {
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    const styles = getComputedStyle(document.body);
    grad.addColorStop(0, styles.getPropertyValue('--primary').trim());
    grad.addColorStop(1, styles.getPropertyValue('--primary-2').trim());
    return grad;
  }


  function updateResponsiveDensity() {
    const width = window.innerWidth || 1440;
    const height = window.innerHeight || 900;
    const root = document.body;
    let density = 'spacious';
    if (width < 820 || height < 640) density = 'compact';
    else if (width < 1180 || height < 760) density = 'dense';
    else if (width < 1480 || height < 860) density = 'comfortable';
    root.dataset.density = density;
    window.requestAnimationFrame(fitNowPlayingText);
  }

  function fitElementText(element, container, options = {}) {
    if (!element || !container) return;
    const min = options.min || 22;
    const max = options.max || 58;
    const maxHeightRatio = options.maxHeightRatio || 0.38;
    const availableWidth = Math.max(150, container.clientWidth - 2);
    const availableHeight = Math.max(options.minHeight || 72, Math.min(container.clientHeight * maxHeightRatio, options.maxHeight || 170));

    element.style.fontSize = `${max}px`;
    element.style.lineHeight = options.lineHeight || '0.94';
    element.style.maxHeight = `${availableHeight}px`;

    let low = min;
    let high = max;
    for (let i = 0; i < 9; i += 1) {
      const mid = (low + high) / 2;
      element.style.fontSize = `${mid}px`;
      const fitsWidth = element.scrollWidth <= availableWidth + 1;
      const fitsHeight = element.scrollHeight <= availableHeight + 1;
      if (fitsWidth && fitsHeight) low = mid;
      else high = mid;
    }
    element.style.fontSize = `${Math.floor(low)}px`;
  }

  function fitNowPlayingText() {
    if (!els.currentTitle || !els.currentArtist) return;
    const meta = els.currentTitle.closest('.track-meta');
    if (!meta) return;
    const width = window.innerWidth || 1440;
    const density = document.body.dataset.density || 'spacious';
    const max = density === 'compact' ? 34 : density === 'dense' ? 40 : density === 'comfortable' ? 46 : 58;
    const min = density === 'compact' ? 18 : 22;
    fitElementText(els.currentTitle, meta, { min, max, minHeight: 58, maxHeightRatio: 0.35, maxHeight: width < 1480 ? 124 : 162 });

    const artistMax = density === 'compact' ? 15 : density === 'dense' ? 16 : 18;
    els.currentArtist.style.fontSize = `${artistMax}px`;
    const note = els.capabilityNote;
    if (note) note.style.fontSize = density === 'compact' ? '0.78rem' : density === 'dense' ? '0.84rem' : '';
  }

  let responsiveResizeTimer = null;
  function scheduleResponsiveFit() {
    window.clearTimeout(responsiveResizeTimer);
    responsiveResizeTimer = window.setTimeout(updateResponsiveDensity, 80);
  }


  function normalizeUrl(value) {
    return String(value || '').trim().replace(/\/+$/, '').toLowerCase();
  }

  function findDuplicateTrack(candidate) {
    if (!candidate) return null;
    const candidateUrl = normalizeUrl(candidate.sourceUrl);
    const candidateName = `${candidate.title || ''}|${candidate.artist || ''}|${candidate.sourceType || ''}`.toLowerCase();
    return state.library.find(track => {
      const sameUrl = candidateUrl && normalizeUrl(track.sourceUrl) === candidateUrl;
      const sameLocalName = candidate.sourceType === 'local'
        && track.sourceType === 'local'
        && String(track.title || '').toLowerCase() === String(candidate.title || '').toLowerCase()
        && String(track.artist || '').toLowerCase() === String(candidate.artist || '').toLowerCase();
      const sameGenerated = `${track.title || ''}|${track.artist || ''}|${track.sourceType || ''}`.toLowerCase() === candidateName;
      return sameUrl || sameLocalName || sameGenerated;
    }) || null;
  }

  function addTrackIfUnique(track, options = {}) {
    const existing = findDuplicateTrack(track);
    if (existing && !options.allowDuplicate) {
      return { added: false, existing };
    }
    state.library.unshift(track);
    return { added: true, track };
  }

  function recordRecentlyPlayed(track) {
    if (!track) return;
    const entry = {
      id: track.id,
      title: track.title,
      artist: track.artist || 'Unknown Artist',
      sourceType: track.sourceType || 'unknown',
      playedAt: new Date().toISOString()
    };
    const next = [entry, ...(state.settings.recentlyPlayed || []).filter(item => item.id !== track.id)].slice(0, 12);
    state.settings.recentlyPlayed = next;
    track.lastPlayedAt = entry.playedAt;
    track.playCount = (track.playCount || 0) + 1;
    saveState();
    renderRecentlyPlayed();
  }

  function renderRecentlyPlayed() {
    if (!els.recentlyPlayedList) return;
    const list = state.settings.recentlyPlayed || [];
    if (!list.length) {
      els.recentlyPlayedList.innerHTML = '<div class="empty-state compact"><div>◷</div><h3>No recently played tracks yet</h3><p>Play a track to populate this release polish panel.</p></div>';
      return;
    }
    els.recentlyPlayedList.innerHTML = list.map(item => `
      <div class="recent-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.artist)} · ${escapeHtml(item.sourceType)}</span>
        </div>
        <button class="btn secondary" data-recent-play="${escapeHtml(item.id)}">Play</button>
      </div>
    `).join('');
  }

  function scanDuplicates() {
    const seen = new Map();
    const duplicates = [];
    for (const track of state.library) {
      const key = track.sourceUrl
        ? `url:${normalizeUrl(track.sourceUrl)}`
        : `meta:${String(track.sourceType || '').toLowerCase()}|${String(track.title || '').toLowerCase()}|${String(track.artist || '').toLowerCase()}`;
      if (seen.has(key)) duplicates.push(track);
      else seen.set(key, track);
    }
    if (!duplicates.length) {
      showInfo('Duplicate scan complete', 'No duplicate local names or streaming URLs were found.');
      return;
    }
    const remove = confirm(`Found ${duplicates.length} duplicate track${duplicates.length === 1 ? '' : 's'}. Remove duplicate copies and keep the first match?`);
    if (!remove) return;
    setState(draft => {
      const removeIds = new Set(duplicates.map(track => track.id));
      draft.library = draft.library.filter(track => !removeIds.has(track.id));
      draft.queue = draft.queue.filter(id => !removeIds.has(id));
      draft.playlists = draft.playlists.map(pl => ({ ...pl, trackIds: (pl.trackIds || []).filter(id => !removeIds.has(id)) }));
    });
  }

  function clearLibraryWithConfirm() {
    const ok = confirm('Clear the entire EchoDeck library, queue, playlists, and recently played history? This cannot be undone unless you exported a backup.');
    if (!ok) return;
    setState(draft => {
      draft.library = [];
      draft.queue = [];
      draft.queueIndex = -1;
      draft.playlists = [];
      draft.settings.recentlyPlayed = [];
    });
    showInfo('Library cleared', 'EchoDeck local library data was cleared.');
  }

  function render() {
    document.body.dataset.theme = state.settings.theme;
    document.body.dataset.deckMode = state.settings.deckMode || 'classic';
    document.body.dataset.mobilePreview = state.settings.mobilePreview ? 'true' : 'false';
    els.runtimeLabel.textContent = isElectron ? 'Desktop Local App Ready' : 'Browser Preview Mode';
    els.libraryCount.textContent = state.library.length;
    els.playlistCount.textContent = state.playlists.length;
    els.queueCount.textContent = state.queue.length;
    els.volumeRange.value = state.settings.volume;
    els.volumeLabel.textContent = `${Math.round(state.settings.volume * 100)}%`;
    els.crossfadeToggle.checked = state.settings.crossfadeEnabled;
    els.crossfadeRange.value = state.settings.crossfadeSeconds;
    els.crossfadeLabel.textContent = `${state.settings.crossfadeSeconds}s`;
    if (els.librarySourceFilter) els.librarySourceFilter.value = state.settings.libraryFilter || 'all';
    if (els.librarySort) els.librarySort.value = state.settings.librarySort || 'recent';
    renderLibrary();
    renderQueue();
    renderPlaylists();
    renderEq();
    renderThemeButtons();
    renderThemeGallery();
    renderThemePresets();
    renderDeckModeButtons();
    renderVisualButtons();
    renderSourceStats();
    renderRecentlyPlayed();
    updateNowPlaying(currentTrack());
    updateResponsiveDensity();
  }

  function emptyState() {
    return els.emptyTemplate.content.cloneNode(true);
  }

  function sortTracks(tracks, mode) {
    const list = [...tracks];
    const byText = key => list.sort((a, b) => String(a[key] || '').localeCompare(String(b[key] || '')));
    if (mode === 'title') return byText('title');
    if (mode === 'artist') return byText('artist');
    if (mode === 'source') return list.sort((a, b) => String(a.sourceType || '').localeCompare(String(b.sourceType || '')) || String(a.title || '').localeCompare(String(b.title || '')));
    if (mode === 'plays') return list.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
    return list.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  }

  function renderLibrary() {
    const query = els.librarySearch.value.trim().toLowerCase();
    const sourceFilter = els.librarySourceFilter?.value || state.settings.libraryFilter || 'all';
    const sortMode = els.librarySort?.value || state.settings.librarySort || 'recent';
    let tracks = state.library.filter(track => {
      const matchesQuery = !query || [track.title, track.artist, track.album, track.sourceType, ...(track.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query);
      const source = track.sourceType || 'unknown';
      const matchesSource = sourceFilter === 'all'
        || (sourceFilter === 'youtube' && (source === 'youtube' || source === 'youtube-playlist'))
        || (sourceFilter === 'favorites' && track.favorite)
        || source === sourceFilter;
      return matchesQuery && matchesSource;
    });
    tracks = sortTracks(tracks, sortMode);
    if (els.librarySummary) {
      els.librarySummary.textContent = `${tracks.length} of ${state.library.length} track${state.library.length === 1 ? '' : 's'} · Filter: ${sourceFilter} · Sort: ${sortMode}`;
    }
    els.libraryTable.innerHTML = '';
    if (!tracks.length) {
      els.libraryTable.appendChild(emptyState());
      return;
    }
    for (const track of tracks) {
      const row = document.createElement('div');
      row.className = 'track-row';
      row.innerHTML = `
        <div class="art-thumb">${track.sourceType === 'youtube' ? 'YT' : track.sourceType === 'soundcloud' ? 'SC' : '♫'}</div>
        <div>
          <div class="item-title" title="${escapeHtml(track.title)}">${escapeHtml(track.title)}</div>
          <div class="item-sub">${escapeHtml(track.artist || 'Unknown Artist')}</div>
        </div>
        <div class="source-badge">${escapeHtml(track.sourceType)}</div>
        <div class="row-actions">
          <button data-action="play" data-track="${track.id}">Play</button>
          <button data-action="queue" data-track="${track.id}">Queue</button>
          <button data-action="next" data-track="${track.id}">Next</button>
          ${track.sourceUrl ? `<button data-action="open" data-track="${track.id}">Open</button>` : ''}
          <button data-action="remove" data-track="${track.id}">Remove</button>
        </div>
      `;
      els.libraryTable.appendChild(row);
    }
  }

  function renderQueue() {
    els.queueList.innerHTML = '';
    const tracks = state.queue.map(getTrack).filter(Boolean);
    if (!tracks.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = '<div>☷</div><h3>Queue is empty</h3><p>Add tracks from your library or streaming sources.</p>';
      els.queueList.appendChild(empty);
      return;
    }
    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `queue-item ${index === state.queueIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div>
          <div class="item-title">${escapeHtml(track.title)}</div>
          <div class="item-sub">${escapeHtml(track.artist || '')} · ${escapeHtml(sourceLabel(track))}</div>
        </div>
        <div class="small-actions">
          <button data-queue-action="play" data-index="${index}" title="Play now">▶</button>
          <button data-queue-action="next" data-index="${index}" title="Play next">+1</button>
          ${track.sourceUrl ? `<button data-queue-action="open" data-index="${index}" title="Open source">↗</button>` : ''}
          <button data-queue-action="up" data-index="${index}" title="Move up">↑</button>
          <button data-queue-action="down" data-index="${index}">↓</button>
          <button data-queue-action="remove" data-index="${index}">×</button>
        </div>
      `;
      els.queueList.appendChild(item);
    });
  }

  function renderPlaylists() {
    els.playlistGrid.innerHTML = '';
    for (const playlist of state.playlists) {
      const card = document.createElement('div');
      card.className = 'playlist-card';
      const trackCount = playlist.trackIds?.length || 0;
      card.innerHTML = `
        <div class="playlist-cover">${escapeHtml(playlist.name.slice(0, 18))}</div>
        <div>
          <h4>${escapeHtml(playlist.name)}</h4>
          <p>${trackCount} track${trackCount === 1 ? '' : 's'} · ${escapeHtml(playlist.description || 'No description')}</p>
        </div>
        <div class="row-actions">
          <button data-playlist-action="save-queue" data-playlist="${playlist.id}">Save Queue</button>
          <button data-playlist-action="play" data-playlist="${playlist.id}">Play</button>
          <button data-playlist-action="delete" data-playlist="${playlist.id}">Delete</button>
        </div>
      `;
      els.playlistGrid.appendChild(card);
    }
  }

  function renderEq() {
    if (!els.eqBank.dataset.built) {
      els.eqBank.innerHTML = '';
      EQ_BANDS.forEach((band, index) => {
        const wrap = document.createElement('label');
        wrap.className = 'eq-slider';
        wrap.innerHTML = `<strong id="eqValue-${index}">0dB</strong><input type="range" min="-12" max="12" step="1" value="0" data-eq-index="${index}" /><span>${band.label}</span>`;
        els.eqBank.appendChild(wrap);
      });
      els.eqBank.dataset.built = 'true';
    }
    $$('[data-eq-index]').forEach(input => {
      const index = Number(input.dataset.eqIndex);
      input.value = state.settings.eq[index] || 0;
      $(`#eqValue-${index}`).textContent = `${state.settings.eq[index] || 0}dB`;
    });
    if (!els.presetRow.dataset.built) {
      els.presetRow.innerHTML = Object.keys(EQ_PRESETS).map(name => `<button data-preset="${name}">${name}</button>`).join('');
      els.presetRow.dataset.built = 'true';
    }
    $$('[data-preset]').forEach(button => button.classList.toggle('active', button.dataset.preset === state.settings.eqPreset));
  }


  function renderThemeGallery() {
    if (!els.themeGallery || els.themeGallery.dataset.built) return;
    els.themeGallery.innerHTML = THEME_GALLERY.map(theme => `
      <article class="theme-preview-card" data-theme-preview="${theme.id}">
        <div class="theme-preview-window" style="--swatch-a:${theme.colors[0]};--swatch-b:${theme.colors[1]};--swatch-c:${theme.colors[2]}">
          <div class="preview-lcd"></div>
          <div class="preview-disc"></div>
          <div class="preview-bars"><span></span><span></span><span></span><span></span></div>
        </div>
        <div>
          <h4>${escapeHtml(theme.name)}</h4>
          <p>${escapeHtml(theme.use)}</p>
          <small>Best deck: ${escapeHtml(theme.deck)}</small>
        </div>
        <button class="btn secondary" data-apply-theme-gallery="${theme.id}" data-deck="${theme.deck}">Apply</button>
      </article>
    `).join('');
    els.themeGallery.dataset.built = 'true';
  }

  function renderThemePresets() {
    if (!els.themePresetGrid || els.themePresetGrid.dataset.built) return;
    els.themePresetGrid.innerHTML = THEME_PRESETS.map(preset => `
      <button class="preset-card" data-theme-preset="${preset.id}">
        <strong>${escapeHtml(preset.name)}</strong>
        <span>${escapeHtml(preset.theme)} + ${escapeHtml(preset.deck)}</span>
      </button>
    `).join('');
    els.themePresetGrid.dataset.built = 'true';
  }

  function applyThemePreset(presetId) {
    const preset = THEME_PRESETS.find(item => item.id === presetId);
    if (!preset) return;
    setState(draft => {
      draft.settings.theme = preset.theme;
      draft.settings.deckMode = preset.deck;
      draft.settings.visualMode = preset.visual;
      draft.settings.lastView = 'now';
    });
    showInfo('Theme preset applied', `${preset.name} is now your EchoDeck look.`);
  }

  function enableDemoMode() {
    const now = new Date().toISOString();
    const demoTracks = [
      { title: 'Stay ft. Mikky Ekko', artist: 'Rihanna', sourceType: 'local', duration: 239 },
      { title: 'Dramatic Fade Out', artist: 'EchoDeck Lab', sourceType: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 210 },
      { title: 'Analog Night Drive', artist: 'Studio White', sourceType: 'soundcloud', sourceUrl: 'https://soundcloud.com/', duration: 188 },
      { title: 'Vinyl Orbit', artist: 'Demo Crate', sourceType: 'local', duration: 256 },
      { title: 'Cassette Morning', artist: 'Tape Lab', sourceType: 'youtube-playlist', sourceUrl: 'https://www.youtube.com/playlist?list=PLdemo', duration: 180 }
    ].map((track, index) => ({
      id: `demo-${index + 1}`,
      album: 'EchoDeck Demo',
      createdAt: now,
      favorite: index === 0 || index === 3,
      playCount: 7 - index,
      ...track
    }));
    setState(draft => {
      const nonDemo = draft.library.filter(track => !String(track.id).startsWith('demo-'));
      draft.library = [...demoTracks, ...nonDemo];
      draft.queue = demoTracks.map(track => track.id);
      draft.queueIndex = 0;
      draft.playlists = [
        {
          id: 'demo-playlist',
          name: 'Demo Deck Mix',
          description: 'Seeded tracks for screenshots and QA checks.',
          trackIds: demoTracks.map(track => track.id),
          createdAt: now,
          updatedAt: now
        },
        ...draft.playlists.filter(pl => pl.id !== 'demo-playlist')
      ];
      draft.settings.demoMode = true;
      draft.settings.lastView = 'now';
    });
    showInfo('Demo mode enabled', 'EchoDeck now has demo tracks, a queue, and a playlist for screenshots.');
  }

  function clearDemoMode() {
    setState(draft => {
      draft.library = draft.library.filter(track => !String(track.id).startsWith('demo-'));
      draft.queue = draft.queue.filter(id => !String(id).startsWith('demo-'));
      draft.playlists = draft.playlists.filter(pl => pl.id !== 'demo-playlist');
      if (draft.queueIndex >= draft.queue.length) draft.queueIndex = draft.queue.length ? 0 : -1;
      draft.settings.demoMode = false;
    });
    showInfo('Demo mode cleared', 'Demo tracks and the demo playlist were removed.');
  }

  function renderThemeButtons() {
    $$('[data-theme-choice]').forEach(button => button.classList.toggle('active', button.dataset.themeChoice === state.settings.theme));
  }

  function renderDeckModeButtons() {
    const mode = state.settings.deckMode || 'classic';
    $$('[data-deck-mode]').forEach(button => button.classList.toggle('active', button.dataset.deckMode === mode));
    if (els.mobilePreviewBtn) els.mobilePreviewBtn.classList.toggle('active', Boolean(state.settings.mobilePreview));
  }

  function setDeckMode(mode) {
    const allowed = new Set(['classic', 'cassette', 'turntable', 'equalizer', 'visualizer', 'mini']);
    if (!allowed.has(mode)) return;
    setState(draft => { draft.settings.deckMode = mode; });
    window.requestAnimationFrame(fitNowPlayingText);
  }

  function cycleDeckMode() {
    const modes = ['classic', 'cassette', 'turntable', 'equalizer', 'visualizer', 'mini'];
    const current = state.settings.deckMode || 'classic';
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    setDeckMode(next);
  }

  function toggleMobilePreview() {
    setState(draft => { draft.settings.mobilePreview = !draft.settings.mobilePreview; });
    updateResponsiveDensity();
  }

  function renderVisualButtons() {
    $$('[data-visual]').forEach(button => button.classList.toggle('active', button.dataset.visual === state.settings.visualMode));
    updateFullVisualizerLabels();
  }


  function renderSourceStats() {
    if (!els.sourceStats) return;
    const counts = state.library.reduce((acc, track) => {
      const source = track.sourceType || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    const cards = [
      ['Local', counts.local || 0, 'EQ / Crossfade / Visuals'],
      ['YouTube', (counts.youtube || 0) + (counts['youtube-playlist'] || 0), 'Embed playback'],
      ['SoundCloud', counts.soundcloud || 0, 'Widget playback'],
      ['Total', state.library.length, 'Library sources']
    ];
    els.sourceStats.innerHTML = cards.map(([label, count, note]) => `
      <div class="source-stat-card">
        <strong>${count}</strong>
        <span>${label}</span>
        <em>${note}</em>
      </div>
    `).join('');
  }

  function openTrackSource(track) {
    if (!track?.sourceUrl) return toast('No external source URL is available for this track.');
    if (isElectron) window.echoDeck.openExternal(track.sourceUrl);
    else window.open(track.sourceUrl, '_blank', 'noopener,noreferrer');
  }

  async function copyTrackSource(track) {
    if (!track?.sourceUrl) return toast('No external source URL is available for this track.');
    try {
      await navigator.clipboard.writeText(track.sourceUrl);
      toast('Source link copied');
    } catch (error) {
      toast('Could not copy link in this runtime.');
    }
  }

  function saveQueueAsPlaylist() {
    if (!state.queue.length) return toast('Queue is empty. Add tracks before saving a playlist.');
    const name = prompt('Save queue as playlist', `Queue ${new Date().toLocaleDateString()}`);
    if (!name) return;
    setState(draft => {
      draft.playlists.push({
        id: crypto.randomUUID(),
        name,
        description: `Saved from queue · ${draft.queue.length} item${draft.queue.length === 1 ? '' : 's'}`,
        trackIds: [...draft.queue],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
    toast('Queue saved as playlist');
  }

  function downloadJson(filename, payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toast(message) {
    const node = document.createElement('div');
    node.textContent = message;
    Object.assign(node.style, {
      position: 'fixed',
      right: '22px',
      bottom: '22px',
      zIndex: 9999,
      padding: '12px 14px',
      borderRadius: '14px',
      color: 'white',
      background: 'rgba(15,23,42,0.94)',
      border: '1px solid rgba(148,163,184,0.28)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      maxWidth: '360px'
    });
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2600);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function openFullVisualizer() {
    if (!els.visualizerOverlay) return;
    els.visualizerOverlay.classList.remove('hidden');
    updateFullVisualizerLabels();
    startVisualizer();
    if (els.visualizerOverlay.requestFullscreen && !document.fullscreenElement) {
      els.visualizerOverlay.requestFullscreen().catch(() => {
        // Fullscreen can be blocked by the runtime; the fixed overlay still works.
      });
    }
  }

  function closeFullVisualizer() {
    if (!els.visualizerOverlay) return;
    els.visualizerOverlay.classList.add('hidden');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  function updateFullVisualizerLabels() {
    const track = currentTrack();
    if (!els.visualizerOverlayTitle || !els.visualizerOverlaySubtitle) return;
    els.visualizerOverlayTitle.textContent = track ? track.title : 'EchoDeck Visuals';
    els.visualizerOverlaySubtitle.textContent = track
      ? `${track.artist || 'Unknown Artist'} · ${sourceLabel(track)}`
      : 'Select a local track for audio-reactive visuals. Streaming embeds show an ambient source-safe visual.';
  }

  function showInfo(title, text) {
    els.infoTitle.textContent = title;
    els.infoText.textContent = text;
    els.infoDialog.showModal();
  }

  function setView(viewName, persist = true) {
    const allowed = new Set(['now', 'library', 'playlists', 'sources', 'audio', 'settings']);
    if (!allowed.has(viewName)) viewName = 'now';
    $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    $$('.mobile-tabbar button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    $$('.view').forEach(view => view.classList.toggle('active', view.id === `view-${viewName}`));
    const titles = { now: 'Now Playing', library: 'Library', playlists: 'Playlists', sources: 'Streaming Sources', audio: 'EQ / Visuals', settings: 'Settings' };
    els.viewTitle.textContent = titles[viewName] || 'EchoDeck';
    if (persist) {
      state.settings.lastView = viewName;
      saveState();
    }
  }

  function wireEvents() {
    $$('.nav-item').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
    $$('.mobile-tabbar button').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
    els.importFilesBtn.addEventListener('click', importElectronFiles);
    els.importFolderBtn.addEventListener('click', importElectronFolder);
    els.browserFileBtn.addEventListener('click', () => els.browserFileInput.click());
    els.browserFileInput.addEventListener('change', event => importBrowserFiles(event.target.files));
    els.addStreamBtn.addEventListener('click', () => els.streamDialog.showModal());
    els.confirmStreamAdd.addEventListener('click', (event) => {
      event.preventDefault();
      addStreamingUrl(els.genericStreamUrl.value, { title: els.streamTitle.value.trim(), artist: els.streamArtist.value.trim() });
      els.genericStreamUrl.value = '';
      els.streamTitle.value = '';
      els.streamArtist.value = '';
      els.streamDialog.close();
    });

    $$('[data-add-stream]').forEach(button => button.addEventListener('click', () => {
      const input = button.dataset.addStream === 'youtube' ? els.youtubeUrl : els.soundcloudUrl;
      addStreamingUrl(input.value);
      input.value = '';
    }));

    els.playBtn.addEventListener('click', togglePlay);
    els.nextBtn.addEventListener('click', nextTrack);
    els.prevBtn.addEventListener('click', prevTrack);
    els.shuffleBtn.addEventListener('click', () => setState(draft => { draft.settings.shuffle = !draft.settings.shuffle; }));
    els.repeatBtn.addEventListener('click', () => setState(draft => {
      draft.settings.repeatMode = draft.settings.repeatMode === 'off' ? 'all' : draft.settings.repeatMode === 'all' ? 'one' : 'off';
    }));
    els.fullVisualizerBtn.addEventListener('click', openFullVisualizer);
    els.favoriteBtn.addEventListener('click', () => {
      const track = currentTrack();
      if (!track) return;
      setState(draft => {
        const target = draft.library.find(item => item.id === track.id);
        if (target) target.favorite = !target.favorite;
      });
    });
    if (els.saveQueueBtn) els.saveQueueBtn.addEventListener('click', saveQueueAsPlaylist);
    els.clearQueueBtn.addEventListener('click', () => {
      if (!state.queue.length) return;
      if (!confirm('Clear the current queue?')) return;
      setState(draft => { draft.queue = []; draft.queueIndex = -1; });
      pauseCurrent();
    });
    els.openCurrentSourceBtn.addEventListener('click', () => openTrackSource(currentTrack()));
    els.copyCurrentSourceBtn.addEventListener('click', () => copyTrackSource(currentTrack()));
    els.closeEmbedBtn.addEventListener('click', () => {
      els.embedPanel.classList.add('hidden');
      els.embedHost.innerHTML = '';
      isPlaying = false;
      renderPlaybackState();
    });

    els.volumeRange.addEventListener('input', event => setVolume(event.target.value));
    els.seekRange.addEventListener('input', () => { isSeeking = true; });
    els.seekRange.addEventListener('change', event => {
      const duration = activeAudio.duration || 0;
      activeAudio.currentTime = (Number(event.target.value) / 100) * duration;
      isSeeking = false;
    });

    activeAudio.addEventListener('timeupdate', () => {
      const duration = activeAudio.duration || 0;
      if (!isSeeking && duration) els.seekRange.value = String((activeAudio.currentTime / duration) * 100);
      els.currentTime.textContent = formatTime(activeAudio.currentTime);
      els.durationTime.textContent = formatTime(duration);
      if (duration && state.settings.crossfadeEnabled && currentTrack()?.sourceType === 'local') {
        const remaining = duration - activeAudio.currentTime;
        if (remaining <= state.settings.crossfadeSeconds + 0.05 && remaining > 0.25) performCrossfade();
      }
    });
    activeAudio.addEventListener('ended', nextTrack);
    activeAudio.addEventListener('play', () => { isPlaying = true; renderPlaybackState(); });
    activeAudio.addEventListener('pause', () => { if (activeAudio.ended) return; isPlaying = false; renderPlaybackState(); });

    els.libraryTable.addEventListener('click', event => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const trackId = button.dataset.track;
      const action = button.dataset.action;
      if (action === 'play') playTrackById(trackId);
      if (action === 'queue') addToQueue(trackId);
      if (action === 'next') addToQueue(trackId, true);
      if (action === 'open') openTrackSource(getTrack(trackId));
      if (action === 'remove') {
        setState(draft => {
          draft.library = draft.library.filter(track => track.id !== trackId);
          draft.queue = draft.queue.filter(id => id !== trackId);
          draft.playlists.forEach(playlist => playlist.trackIds = playlist.trackIds.filter(id => id !== trackId));
          if (draft.queueIndex >= draft.queue.length) draft.queueIndex = draft.queue.length - 1;
        });
      }
    });

    els.queueList.addEventListener('click', event => {
      const button = event.target.closest('button[data-queue-action]');
      if (!button) return;
      const index = Number(button.dataset.index);
      const action = button.dataset.queueAction;
      if (action === 'open') return openTrackSource(getTrack(state.queue[index]));
      if (action === 'next') {
        const id = state.queue[index];
        if (!id) return;
        setState(draft => {
          draft.queue.splice(index, 1);
          const insertAt = Math.min(draft.queue.length, Math.max(0, draft.queueIndex + 1));
          draft.queue.splice(insertAt, 0, id);
          if (draft.queueIndex >= index) draft.queueIndex = Math.max(0, draft.queueIndex - 1);
        });
        return toast('Moved to play next');
      }
      setState(draft => {
        if (action === 'play') draft.queueIndex = index;
        if (action === 'remove') {
          draft.queue.splice(index, 1);
          if (draft.queueIndex >= draft.queue.length) draft.queueIndex = draft.queue.length - 1;
        }
        if (action === 'up' && index > 0) {
          [draft.queue[index - 1], draft.queue[index]] = [draft.queue[index], draft.queue[index - 1]];
          if (draft.queueIndex === index) draft.queueIndex = index - 1;
        }
        if (action === 'down' && index < draft.queue.length - 1) {
          [draft.queue[index + 1], draft.queue[index]] = [draft.queue[index], draft.queue[index + 1]];
          if (draft.queueIndex === index) draft.queueIndex = index + 1;
        }
      });
      if (action === 'play') playCurrent();
    });

    els.librarySearch.addEventListener('input', renderLibrary);
    if (els.librarySourceFilter) els.librarySourceFilter.addEventListener('change', event => setState(draft => { draft.settings.libraryFilter = event.target.value; }));
    if (els.librarySort) els.librarySort.addEventListener('change', event => setState(draft => { draft.settings.librarySort = event.target.value; }));
    els.exportLibraryBtn.addEventListener('click', () => downloadJson(`echodeck-library-${new Date().toISOString().slice(0,10)}.json`, { library: state.library, playlists: state.playlists }));
    els.importLibraryBtn.addEventListener('click', () => els.importLibraryInput.click());
    els.importLibraryInput.addEventListener('change', async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const payload = JSON.parse(await file.text());
        setState(draft => {
          if (Array.isArray(payload.library)) draft.library = payload.library;
          if (Array.isArray(payload.playlists)) draft.playlists = payload.playlists;
        });
      } catch (error) {
        toast('Could not import that JSON file.');
      }
    });

    els.newPlaylistBtn.addEventListener('click', () => {
      const name = prompt('Playlist name', `Playlist ${state.playlists.length + 1}`);
      if (!name) return;
      setState(draft => draft.playlists.push({ id: crypto.randomUUID(), name, description: 'Custom playlist', trackIds: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
    });
    els.playlistGrid.addEventListener('click', event => {
      const button = event.target.closest('button[data-playlist-action]');
      if (!button) return;
      const playlistId = button.dataset.playlist;
      const action = button.dataset.playlistAction;
      const playlist = state.playlists.find(item => item.id === playlistId);
      if (!playlist) return;
      if (action === 'save-queue') {
        setState(draft => {
          const target = draft.playlists.find(item => item.id === playlistId);
          target.trackIds = [...draft.queue];
          target.updatedAt = new Date().toISOString();
        });
        toast('Current queue saved to playlist');
      }
      if (action === 'play') {
        setState(draft => { draft.queue = [...playlist.trackIds]; draft.queueIndex = draft.queue.length ? 0 : -1; });
        playCurrent();
      }
      if (action === 'delete') {
        if (confirm(`Delete playlist "${playlist.name}"?`)) setState(draft => { draft.playlists = draft.playlists.filter(item => item.id !== playlistId); });
      }
    });

    els.eqBank.addEventListener('input', event => {
      const input = event.target.closest('[data-eq-index]');
      if (!input) return;
      const index = Number(input.dataset.eqIndex);
      const value = Number(input.value);
      setState(draft => { draft.settings.eq[index] = value; draft.settings.eqPreset = 'Custom'; });
      if (audioContext) applyEq(state.settings.eq);
    });
    els.presetRow.addEventListener('click', event => {
      const button = event.target.closest('[data-preset]');
      if (!button) return;
      const preset = button.dataset.preset;
      setState(draft => { draft.settings.eq = [...EQ_PRESETS[preset]]; draft.settings.eqPreset = preset; });
      if (audioContext) applyEq(state.settings.eq);
    });
    els.resetEqBtn.addEventListener('click', () => {
      setState(draft => { draft.settings.eq = [0, 0, 0, 0, 0]; draft.settings.eqPreset = 'Flat'; });
      if (audioContext) applyEq(state.settings.eq);
    });
    els.crossfadeToggle.addEventListener('change', event => setState(draft => { draft.settings.crossfadeEnabled = event.target.checked; }));
    els.crossfadeRange.addEventListener('input', event => setState(draft => { draft.settings.crossfadeSeconds = Number(event.target.value); }));
    els.openFullVisualizerBtn.addEventListener('click', openFullVisualizer);
    els.closeFullVisualizerBtn.addEventListener('click', closeFullVisualizer);
    els.visualizerOverlay.addEventListener('click', event => {
      const button = event.target.closest('[data-visual]');
      if (!button) return;
      setState(draft => { draft.settings.visualMode = button.dataset.visual; });
      startVisualizer();
    });
    els.visualModeButtons.addEventListener('click', event => {
      const button = event.target.closest('[data-visual]');
      if (!button) return;
      setState(draft => { draft.settings.visualMode = button.dataset.visual; });
      startVisualizer();
    });
    els.themeOptions.addEventListener('click', event => {
      const button = event.target.closest('[data-theme-choice]');
      if (!button) return;
      setState(draft => { draft.settings.theme = button.dataset.themeChoice; });
    });

    els.themeGallery?.addEventListener('click', event => {
      const button = event.target.closest('[data-apply-theme-gallery]');
      if (!button) return;
      setState(draft => {
        draft.settings.theme = button.dataset.applyThemeGallery;
        draft.settings.deckMode = button.dataset.deck || 'classic';
      });
    });

    els.themePresetGrid?.addEventListener('click', event => {
      const button = event.target.closest('[data-theme-preset]');
      if (!button) return;
      applyThemePreset(button.dataset.themePreset);
    });

    els.enableDemoModeBtn?.addEventListener('click', enableDemoMode);
    els.clearDemoModeBtn?.addEventListener('click', clearDemoMode);

    const handleDeckModeClick = event => {
      const button = event.target.closest('[data-deck-mode]');
      if (!button) return;
      setDeckMode(button.dataset.deckMode);
    };
    if (els.deckModeStrip) els.deckModeStrip.addEventListener('click', event => {
      if (event.target.closest('#mobilePreviewBtn')) return;
      handleDeckModeClick(event);
    });
    if (els.deckModeOptions) els.deckModeOptions.addEventListener('click', handleDeckModeClick);
    if (els.mobilePreviewBtn) els.mobilePreviewBtn.addEventListener('click', toggleMobilePreview);

    els.importStreamListBtn.addEventListener('click', () => addStreamingList(els.bulkStreamUrls.value));
    els.clearStreamListBtn.addEventListener('click', () => { els.bulkStreamUrls.value = ''; els.streamIntakeSummary.textContent = 'Supported now: YouTube videos/playlists and SoundCloud URLs.'; });
    els.searchYoutubeBtn.addEventListener('click', () => openExternalSearch('https://www.youtube.com/results?search_query='));
    els.searchSoundCloudBtn.addEventListener('click', () => openExternalSearch('https://soundcloud.com/search?q='));
    els.spotifyPlanBtn.addEventListener('click', () => showInfo('Spotify Integration Plan', 'Planned for v0.3.x: Spotify OAuth, catalog search, playlist import, and Web Playback SDK playback where Spotify allows it. Some users may need Spotify Premium. EchoDeck will not intercept, modify, cache, or re-stream Spotify audio.'));
    els.applePlanBtn.addEventListener('click', () => showInfo('Apple Music Integration Plan', 'Planned for v0.4.x: MusicKit authorization, Apple Music catalog search, user library access, and MusicKit playback. EchoDeck will use official Apple Music APIs and authorized playback only.'));
    els.exportSettingsBtn.addEventListener('click', () => downloadJson(`echodeck-backup-${new Date().toISOString().slice(0,10)}.json`, state));
    els.clearLibraryBtn?.addEventListener('click', clearLibraryWithConfirm);
    els.duplicateScanBtn?.addEventListener('click', scanDuplicates);
    els.recentlyPlayedList?.addEventListener('click', event => {
      const button = event.target.closest('[data-recent-play]');
      if (!button) return;
      const id = button.dataset.recentPlay;
      const index = state.queue.indexOf(id);
      if (index >= 0) {
        state.queueIndex = index;
      } else if (getTrack(id)) {
        state.queue.unshift(id);
        state.queueIndex = 0;
      }
      saveState();
      loadCurrentTrack(true);
      render();
    });

    els.resetAppBtn.addEventListener('click', () => {
      if (!confirm('Reset EchoDeck local data? This clears saved library metadata, playlists, queue, and settings.')) return;
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !els.visualizerOverlay.classList.contains('hidden')) closeFullVisualizer();
      if ((event.key || '').toLowerCase() === 'f' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) openFullVisualizer();
      const inText = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (inText) return;
      if (event.code === 'Space') { event.preventDefault(); togglePlay(); }
      if ((event.key || '').toLowerCase() === 'd') cycleDeckMode();
      if ((event.key || '').toLowerCase() === 'm') toggleMobilePreview();
      if (event.key === 'ArrowRight' && !(event.metaKey || event.ctrlKey)) activeAudio.currentTime = Math.min((activeAudio.duration || 0), activeAudio.currentTime + 10);
      if (event.key === 'ArrowLeft' && !(event.metaKey || event.ctrlKey)) activeAudio.currentTime = Math.max(0, activeAudio.currentTime - 10);
      if (event.key === 'ArrowRight' && (event.metaKey || event.ctrlKey)) nextTrack();
      if (event.key === 'ArrowLeft' && (event.metaKey || event.ctrlKey)) prevTrack();
    });

    window.addEventListener('dragover', event => { event.preventDefault(); });
    window.addEventListener('drop', event => {
      event.preventDefault();
      if (event.dataTransfer?.files?.length) importBrowserFiles(event.dataTransfer.files);
    });
    window.addEventListener('resize', scheduleResponsiveFit);
    if (window.ResizeObserver && els.currentTitle) {
      const meta = els.currentTitle.closest('.track-meta');
      if (meta) new ResizeObserver(scheduleResponsiveFit).observe(meta);
    }

    if (isElectron) {
      window.echoDeck.onMenuImportFiles(importElectronFiles);
      window.echoDeck.onMenuImportFolder(importElectronFolder);
      window.echoDeck.onMenuTogglePlay(togglePlay);
      window.echoDeck.onMenuNextTrack(nextTrack);
      window.echoDeck.onMenuPrevTrack(prevTrack);
    }
  }

  function openExternalSearch(base) {
    const query = els.externalSearch.value.trim();
    if (!query) return toast('Enter a search term first.');
    const url = `${base}${encodeURIComponent(query)}`;
    if (isElectron) window.echoDeck.openExternal(url);
    else window.open(url, '_blank', 'noopener,noreferrer');
  }

  wireEvents();
  render();
  setView(state.settings.lastView || 'now', false);
  updateNowPlaying(currentTrack());
  updateResponsiveDensity();
  startVisualizer();
})();
