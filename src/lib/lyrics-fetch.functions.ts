export interface SyncedLine { time: number; text: string; }
export interface SyncedLyricsResult { found: boolean; plain: string; synced: SyncedLine[]; trackName?: string; artistName?: string; }

export function fetchSyncedLyrics({ data }: { data: { title: string; artist?: string; duration?: number } }) {
  // Return an empty finding
  return Promise.resolve({ found: false, plain: "", synced: [] });
}