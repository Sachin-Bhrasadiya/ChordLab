// Required for: Providing a centralized networking client to construct API URLs, auto-inject authentication tokens, and standardize JSON error handling.

const backendBaseUrl = (import.meta.env["VITE_BACKEND_URL"] || "").replace(/\/+$/, "");

// Constructs the full absolute API endpoint URL using the base URL from your environment variables
export function backendUrl(path: string): string {
  return `${backendBaseUrl}${path}`;
}

// Wraps the native fetch API to automatically attach the user's saved session token to the request headers
export function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  const token = localStorage.getItem("chordlab-user-token");
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(backendUrl(path), { ...init, headers });
}

// Helper that executes an API request, parses the JSON payload, and extracts backend error messages if it fails
export async function backendJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await backendFetch(path, init);
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { detail?: string; error?: string };
    throw new Error(body.detail ?? body.error ?? "The API request failed.");
  }
  return (await response.json()) as T;
}