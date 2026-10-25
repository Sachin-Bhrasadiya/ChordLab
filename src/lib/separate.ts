import { type StemName } from "./studio";

export async function startSeparation(file: File | Blob): Promise<{ name: StemName; blob: Blob }[]> {
  // Future addition as Stem separation requires a heavy backend server. 
  throw new Error("Stem separation requires an active backend server.");
}