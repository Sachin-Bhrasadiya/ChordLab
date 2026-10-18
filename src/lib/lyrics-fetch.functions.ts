// Required for: Fetching plain and time-synced lyrics from the backend (via services like LRCLIB) to align chords with the exact words being sung.
import { backendJson } from "./backend";

// Represents a single line of lyrics mapped to an exact timestamp in the song
export interface SyncedLine {
  /** seconds */
  time: number;
  text: string;
}

// The expected response payload containing both the raw text and the time-synced lyric arrays
export interface SyncedLyricsResult {
  found: boolean;
  plain: string;
  synced: SyncedLine[];
  trackName?: string;
  artistName?: string;
}

// POSTs the song title and artist to the backend to search for and retrieve matching lyrics
export function fetchSyncedLyrics({
  data,
}: {
  data: { title: string; artist?: string; duration?: number };
}) {
  return backendJson<SyncedLyricsResult>("/api/lyrics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}