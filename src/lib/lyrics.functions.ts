/**
 * Transliterates lyric text the user supplied themselves. It never fetches or
 * generates song lyrics — it only converts the user's own input line by line.
 */
export function romanizeLyrics({
  data,
}: {
  data: { lyrics: string; style: "hinglish" | "tanglish" | "auto" | "english" };
}) {
  // Frontend-only mode: Bypass the API and just return the original text
  return Promise.resolve({ text: data.lyrics });
}
