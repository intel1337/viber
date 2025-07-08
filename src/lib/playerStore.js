import { writable } from 'svelte/store';

export const playerState = writable({
  progress: 0,
  duration: 100,
  isPlaying: false,
  volume: 50,
  trackIndex: 0
}); 