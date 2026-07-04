const { app, BrowserWindow, dialog, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.oga', '.flac', '.webm']);

function fileToTrack(filePath) {
  const parsed = path.parse(filePath);
  const clean = parsed.name.replace(/[_]+/g, ' ').replace(/[-]+/g, ' - ').replace(/\s+/g, ' ').trim();
  let artist = 'Local Library';
  let title = clean || parsed.base;
  if (clean.includes(' - ')) {
    const parts = clean.split(' - ');
    artist = parts.shift().trim() || artist;
    title = parts.join(' - ').trim() || title;
  }
  return {
    id: `local-${Buffer.from(filePath).toString('base64url')}`,
    sourceType: 'local',
    title,
    artist,
    album: '',
    duration: null,
    filePath,
    fileName: parsed.base,
    extension: parsed.ext.toLowerCase(),
    artworkUrl: '',
    createdAt: new Date().toISOString(),
    tags: ['local'],
    favorite: false,
    playCount: 0,
    lastPlayedAt: null
  };
}

function scanDirectory(dirPath, limit = 10000) {
  const tracks = [];
  const stack = [dirPath];
  while (stack.length && tracks.length < limit) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (error) {
      continue;
    }
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && AUDIO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        tracks.push(fileToTrack(fullPath));
      }
    }
  }
  return tracks;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0f172a',
    title: 'EchoDeck',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  if (process.argv.includes('--dev')) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  return win;
}

function buildMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        { label: 'Import Audio Files', accelerator: 'CmdOrCtrl+O', click: async (_, win) => win?.webContents.send('menu-import-files') },
        { label: 'Import Music Folder', accelerator: 'CmdOrCtrl+Shift+O', click: async (_, win) => win?.webContents.send('menu-import-folder') },
        { type: 'separator' },
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Playback',
      submenu: [
        { label: 'Play / Pause', accelerator: 'Space', click: (_, win) => win?.webContents.send('menu-toggle-play') },
        { label: 'Next Track', accelerator: 'CmdOrCtrl+Right', click: (_, win) => win?.webContents.send('menu-next-track') },
        { label: 'Previous Track', accelerator: 'CmdOrCtrl+Left', click: (_, win) => win?.webContents.send('menu-prev-track') }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('dialog:selectAudioFiles', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Import audio files',
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Audio Files', extensions: [...AUDIO_EXTENSIONS].map(ext => ext.replace('.', '')) },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  if (result.canceled) return [];
  return result.filePaths.filter(filePath => AUDIO_EXTENSIONS.has(path.extname(filePath).toLowerCase())).map(fileToTrack);
});

ipcMain.handle('dialog:selectMusicFolder', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Import music folder',
    properties: ['openDirectory']
  });
  if (result.canceled || !result.filePaths[0]) return [];
  return scanDirectory(result.filePaths[0]);
});

ipcMain.handle('app:openExternal', async (_, url) => {
  await shell.openExternal(url);
  return true;
});
