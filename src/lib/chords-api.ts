export interface CatalogChord {
  _id?: string;
  name?: { eng?: string; spa?: string };
  notes?: Array<{ name?: string | { eng?: string } } | string>;
  images?: { pos1?: string };
}

export async function fetchCatalogChord(label: string): Promise<CatalogChord | null> {
  // Frontend-only mode: Return null to fall back to local chord calculation
  return Promise.resolve(null);
}