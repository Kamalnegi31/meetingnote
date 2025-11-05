import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  saveNotes: (content: string, filename?: string) =>
    ipcRenderer.invoke('save-notes', { content, filename }),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
});
