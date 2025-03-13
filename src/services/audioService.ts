export const SOUND_EFFECTS = {
  messageSent: "/sounds/message-sent.mp3",
  messageReceived: "/sounds/message-received.mp3",
};

const audioInstances: Record<string, HTMLAudioElement> = {};

export const initializeAudio = (): void => {
  if (typeof window === 'undefined') return;
  
  Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
    audioInstances[key] = new Audio(path);
  });
};

/**
 * Play a sound effect if audio is enabled
 * @param soundKey Sound effect to play
 * @param isAudioEnabled Whether audio is enabled
 */
export const playSound = (soundKey: keyof typeof SOUND_EFFECTS, isAudioEnabled: boolean): void => {
  if (!isAudioEnabled) return;
  
  const audio = audioInstances[soundKey];
  if (audio) {
    // Reset to start and play
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error(`Error playing sound ${soundKey}:`, error);
    });
  } else {
    console.warn(`Sound ${soundKey} not initialized`);
  }
}; 