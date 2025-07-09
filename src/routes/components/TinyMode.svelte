<script>
import PlayBar from './PlayBar.svelte';
import { playerState } from '../../lib/playerStore.js';
import { isTinyMode } from './isTinyMode.js';
import { onMount } from 'svelte';
import musicdb from '$lib/musicdb.json';
import Fa from 'svelte-fa';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

let trackIndex;
playerState.subscribe(state => {
  trackIndex = state.trackIndex;
});
let currentTrack;
$: currentTrack = musicdb[trackIndex];

function sendToElectron(action) {
  if (window && window.electronAPI) {
    window.electronAPI.windowAction(action);
  } else if (window && window.require) {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send('window-action', action);
  }
}
function backToPhone() {
  sendToElectron('resize-phone');
  isTinyMode.set(false);
}

onMount(() => {
  sendToElectron('resize-tiny');
});
</script>

<div class="tiny-mode-bar">
  <button class="back-btn" aria-label="Back to Phone" on:click={backToPhone}><Fa icon={faArrowLeft} /></button>
  <img class="tiny-cover" src={currentTrack.image} alt="cover" />
  <PlayBar />
</div>

<style>
.tiny-mode-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #383838;
  border-radius: 1rem;
  box-shadow: 0 0 10px #cc92c444;
  padding: 0.3rem 0.5rem;
  min-width: 320px;
  max-width: 430px;
  min-height: 56px;
  height: 100vh;
  width: 100vw;
  gap: 0.5rem;
}
.tiny-cover {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px #cc92c422;
  margin-right: 0.5rem;
}
.back-btn {
  background: none;
  border: none;
  color: #ffb2ec;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: background 0.2s;
  margin-right: 0.5rem;
}
.back-btn:hover {
  background: #383838;
}
</style> 