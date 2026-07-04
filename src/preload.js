const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('echoDeck', {
  platform: process.platform,
  isElectron: true,
  selectAudioFiles: () => ipcRenderer.invoke('dialog:selectAudioFiles'),
  selectMusicFolder: () => ipcRenderer.invoke('dialog:selectMusicFolder'),
  openExternal: (url) => ipcRenderer.invoke('app:openExternal', url),
  onMenuImportFiles: (callback) => ipcRenderer.on('menu-import-files', callback),
  onMenuImportFolder: (callback) => ipcRenderer.on('menu-import-folder', callback),
  onMenuTogglePlay: (callback) => ipcRenderer.on('menu-toggle-play', callback),
  onMenuNextTrack: (callback) => ipcRenderer.on('menu-next-track', callback),
  onMenuPrevTrack: (callback) => ipcRenderer.on('menu-prev-track', callback)
});
