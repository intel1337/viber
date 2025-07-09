<script>
  import Fa from 'svelte-fa';
  import { faPlay, faPause, faForward, faBackward, faStop } from '@fortawesome/free-solid-svg-icons';
  import { playerState } from '../../lib/playerStore.js';
  import { onMount } from 'svelte';
  import musicdb from '$lib/musicdb.json';

  let progress, duration, isPlaying, trackIndex;
  playerState.subscribe(state => {
    progress = state.progress;
    duration = state.duration;
    isPlaying = state.isPlaying;
    trackIndex = state.trackIndex;
  });
  let currentTrack;
  $: currentTrack = musicdb[trackIndex];

  function play() {
    playerState.update(state => ({ ...state, isPlaying: true }));
  }
  function pause() {
    playerState.update(state => ({ ...state, isPlaying: false }));
  }
  function next() {
    const nextIndex = (trackIndex + 1) % musicdb.length;
    playerState.update(state => ({ ...state, trackIndex: nextIndex, progress: 0 }));
  }
  function stop() {
    playerState.update(state => ({ ...state, isPlaying: false, progress: 0 }));
  }
</script>

<div class="mini-taskbar">
  <img class="mini-cover" src={currentTrack.image} alt="cover" />
  <div class="mini-info">
    <div class="mini-title">{currentTrack.title}</div>
    <div class="mini-artist">{currentTrack.artist}</div>
  </div>
  <div class="mini-controls">
    <button on:click={play} aria-label="Play"><Fa icon={faPlay} /></button>
    <button on:click={pause} aria-label="Pause"><Fa icon={faPause} /></button>
    <button on:click={next} aria-label="Next"><Fa icon={faForward} /></button>
    <button on:click={stop} aria-label="Stop"><Fa icon={faStop} /></button>
  </div>
</div>

<style>
.mini-taskbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(50, 50, 50, 0.95);
  border-radius: 1rem;
  box-shadow: 0 0 10px #cc92c444;
  padding: 0.3rem 1rem;
  min-width: 320px;
  max-width: 390px;
  height: 56px;
  margin: 0 auto;
  gap: 0.7rem;
}
.mini-cover {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px #cc92c422;
}
.mini-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
  min-width: 0;
}
.mini-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-artist {
  font-size: 0.85rem;
  color: #ffb2ec;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-controls {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.mini-controls button {
  background: none;
  border: none;
  color: #ffb2ec;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: background 0.2s;
}
.mini-controls button:hover {
  background: #383838;
}
</style> 