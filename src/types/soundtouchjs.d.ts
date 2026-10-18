// Declares the external soundtouchjs module for TypeScript to resolve missing type definitions
declare module "soundtouchjs" {
  // Core class that processes audio to change pitch and tempo independently
  export class PitchShifter {
    // Initializes the processor with the Web Audio context, the track buffer, and chunk size
    constructor(context: BaseAudioContext, buffer: AudioBuffer, bufferSize: number);
    
    // Adjusts the playback speed without altering the musical key (1.0 = normal speed)
    tempo: number;
    
    // Shifts the musical pitch up or down by exact semitones (e.g., -2 or +2)
    pitchSemitones: number;
    
    // Tracks current playback progress as a fraction from 0.0 to 1.0
    percentagePlayed: number;
    
    // Routes the processed audio stream to a destination node (like your speakers)
    connect(node: AudioNode): void;
    
    // Severs the connection to the audio graph to stop playback and free up memory
    disconnect(): void;
  }
}