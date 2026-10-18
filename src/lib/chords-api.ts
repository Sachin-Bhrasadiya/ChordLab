// Required for: Fetching extended chord catalog data (like alternate names and specific notes) from the backend API.
import { backendFetch } from "./backend";

// Defines the expected structure of a chord's metadata when returned from the backend dictionary
export interface CatalogChord {
  _id?: string;
  name?: { eng?: string; spa?: string };
  notes?: Array<{ name?: string | { eng?: string } } | string>;
  images?: { pos1?: string };
}

// Queries the backend API for a specific chord (e.g., "Cmaj7") and safely returns its detailed catalog data
export async function fetchCatalogChord(label: string): Promise<CatalogChord | null> {
  try {
    const response = await backendFetch(`/api/chords?label=${encodeURIComponent(label)}`);
    if (!response.ok) return null;
    const payload = (await response.json()) as { ok?: boolean; chord?: CatalogChord | null };
    return payload.ok ? (payload.chord ?? null) : null;
  } catch {
    return null;
  }
}