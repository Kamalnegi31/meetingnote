export interface ElectronAPI {
  saveNotes: (content: string, filename?: string) => Promise<{
    success: boolean;
    path?: string;
    canceled?: boolean;
    error?: string;
  }>;
  getAppPath: () => Promise<string>;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {};
