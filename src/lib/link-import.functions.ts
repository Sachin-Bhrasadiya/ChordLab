export interface LinkMeta {
  source: "youtube" | "spotify" | "other";
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
}

export function importLink({ data }: { data: { url: string } }): Promise<LinkMeta> {
  // Simulate a realistic network delay for the presentation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        source: data.url.includes("spotify") ? "spotify" : "youtube",
        title: "Demo Track (Offline Mode)",
        artist: "Demo Artist",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80", 
        url: data.url
      });
    }, 1200); 
  });
}