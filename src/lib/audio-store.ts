// Required for: Managing local browser storage (IndexedDB) to save and retrieve large audio files persistently without needing a backend server.
const DB_NAME = "chordlab-audio";
const STORE = "files";

// Opens a connection to the browser's local IndexedDB, creating the storage container if it doesn't exist yet.
function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Saves the raw audio file to the local database under a unique ID so it can be played back later.
export async function putAudio(id: string, blob: Blob) {
  try {
    const db = await open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(blob, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* storage is best-effort */
  }
}

// Retrieves a previously saved audio file from the database to load into the track player.
export async function getAudio(id: string): Promise<Blob | null> {
  try {
    const db = await open();
    return await new Promise<Blob | null>((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Removes the audio file from local storage to free up space when a user deletes a song from their library.
export async function deleteAudio(id: string) {
  try {
    const db = await open();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
  } catch {
    /* ignore */
  }
}