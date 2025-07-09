<script>
  import Fa from 'svelte-fa';
  import { faPlay, faPause, faForward, faBackward, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
  import { playerState } from '../../lib/playerStore.js';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import musicdb from '$lib/musicdb.json';

  let progress, duration, isPlaying, volume, trackIndex;
  playerState.subscribe(state => {
    progress = state.progress;
    duration = state.duration;
    isPlaying = state.isPlaying;
    volume = state.volume;
    trackIndex = state.trackIndex;
  });
  let showVolume = false;
  let intervalId = null;
  let audio;
  let lastSetByAudio = false;
  let lastSetByAudioVolume = false;
  let isTiny = false;
  onMount(() => {
    isTiny = window.innerWidth <= 440 && window.innerHeight <= 240;
    window.addEventListener('resize', () => {
      isTiny = window.innerWidth <= 440 && window.innerHeight <= 240;
    });
  });

  function loadTrack(index) {
    if (audio) {
      audio.pause();
      audio.src = musicdb[index].path;
      audio.load();
    } else {
      audio = new Audio(musicdb[index].path);
    }
    playerState.update(state => ({
      ...state,
      progress: 0,
      duration: 0,
      isPlaying: false,
      trackIndex: index
    }));
  }

  function next() {
    const nextIndex = (trackIndex + 1) % musicdb.length;
    loadTrack(nextIndex);
  }

  function prev() {
    const prevIndex = (trackIndex - 1 + musicdb.length) % musicdb.length;
    loadTrack(prevIndex);
  }

  let currentTrack;
  $: currentTrack = musicdb[trackIndex];

  onMount(() => {
    audio = new Audio(currentTrack.path);
    audio.volume = volume / 100;
    audio.addEventListener('timeupdate', () => {
      lastSetByAudio = true;
      if (Math.abs(audio.currentTime - progress) > 0.5) {
        playerState.update(state => ({ ...state, progress: audio.currentTime }));
      }
    });
    audio.addEventListener('volumechange', () => {
      lastSetByAudioVolume = true;
      if (Math.abs(audio.volume * 100 - volume) > 1) {
        playerState.update(state => ({ ...state, volume: audio.volume * 100 }));
      }
    });
    audio.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded', audio.duration);
      playerState.update(state => ({ ...state, duration: audio.duration }));
    });
    audio.addEventListener('ended', () => {
      playerState.update(state => ({ ...state, isPlaying: false }));
      // Auto-next on end
      next();
    });
    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  });

  // When progress changes (from store), update audio.currentTime if not set by audio itself
  $: if (audio && !lastSetByAudio) {
    if (Math.abs(audio.currentTime - progress) > 0.5) {
      audio.currentTime = progress;
    }
  }
  $: if (lastSetByAudio) {
    lastSetByAudio = false;
  }
  // When volume changes (from store), update audio.volume if not set by audio itself
  $: if (audio && !lastSetByAudioVolume) {
    if (Math.abs(audio.volume * 100 - volume) > 1) {
      audio.volume = volume / 100;
    }
  }
  $: if (lastSetByAudioVolume) {
    lastSetByAudioVolume = false;
  }

  function togglePlay() {
    playerState.update(state => {
      const newIsPlaying = !state.isPlaying;
      if (audio) {
        if (newIsPlaying) {
          console.log('Attempting to play audio', audio.src);
          audio.play().catch(err => {
            console.error('Audio play error:', err);
          });
        } else {
          audio.pause();
        }
      }
      return { ...state, isPlaying: newIsPlaying };
    });
  }
  function toggleVolumeSlider() {
    showVolume = !showVolume;
  }
  function onSliderInput(e) {
    const newTime = +e.target.value;
    playerState.update(state => ({ ...state, progress: newTime }));
    if (audio) {
      audio.currentTime = newTime;
    }
  }
  function onVolumeInput(e) {
    playerState.update(state => ({ ...state, volume: +e.target.value }));
  }
</script>

<div class="playbar">
  {#if isTiny}
    <img class="tiny-cover" src={currentTrack.image} alt="cover" />
  {/if}
  <button on:click={prev} aria-label="Previous"><Fa icon={faBackward} /></button>
  <button on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
    <Fa icon={isPlaying ? faPause : faPlay} />
  </button>
  <button on:click={next} aria-label="Next"><Fa icon={faForward} /></button>

  <button on:click={toggleVolumeSlider} id="volumebtn" aria-label="Volume"><Fa icon={faVolumeUp} /></button>
  {#if showVolume}
    <input type="range" min="0" max="100" value={volume} on:input={onVolumeInput} class="slider volume-slider" style="width:100px; margin-left:0.5rem;" />
  {/if}
</div>

<style>
  .playbar {
    box-shadow: 0 0 0 2px #cc92c444;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #383838;
    padding: 1rem 2rem;
    border-radius: 2rem;

  }
  .playbar button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #cc92c4;
    cursor: pointer;
    transition: color 0.2s;
    
  }
  .playbar button:hover {
    color: #ffc3ee;
  }
  .slider {
    width: 200px;
    height: 4px;
    background: transparent;
    border: none;
    border-radius: 10px;
    outline: none;
    /* Remove default styles */
    -webkit-appearance: none;
    appearance: none;
    
  }
  .slider:focus {
    box-shadow: 0 0 0 2px #cc92c444;
  }
  /* Webkit (Chrome, Safari) */
  .slider::-webkit-slider-runnable-track {
    height: 4px;
    background: #cc92c4;
    border-radius: 10px;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #cc92c4;
    box-shadow: 0 2px 6px #cc92c422;
    cursor: pointer;
    transition: border 0.2s, box-shadow 0.2s;
    margin-top: -6px;
  }
  .slider:active::-webkit-slider-thumb,
  .slider:focus::-webkit-slider-thumb {
    border: 2px solid #ff6ddf;
    box-shadow: 0 0 0 4px #cc92c422;
  }
  /* Firefox */
  .slider::-moz-range-track {
    height: 4px;
    background: #cc92c4;
    border-radius: 10px;
  }
  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #cc92c4;
    box-shadow: 0 2px 6px #cc92c422;
    cursor: pointer;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .slider:active::-moz-range-thumb,
  .slider:focus::-moz-range-thumb {
    border: 2px solid #ffb2ec;
    box-shadow: 0 0 0 4px #cc92c422;
  }
  /* IE/Edge */
  .slider::-ms-fill-lower {
    background: #cc92c4;
    border-radius: 10px;
  }
  .slider::-ms-fill-upper {
    background: #cc92c4;
    border-radius: 10px;
  }
  .slider::-ms-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #cc92c4;
    box-shadow: 0 2px 6px #cc92c422;
    cursor: pointer;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .slider:active::-ms-thumb,
  .slider:focus::-ms-thumb {
    border: 2px solid rgb(255, 169, 228);
    box-shadow: 0 0 0 4px #cc92c422;
  }
  .slider:focus::-ms-fill-lower {
    background: #cc92c444;
  }
  .slider:focus::-ms-fill-upper {
    background: #cc92c444;
  }
  /* Remove outline for Firefox */
  .slider::-moz-focus-outer {
    border: 0;
  }
  .volume-slider {
    width: 100px;
    margin-left: 0.5rem;
    transition: 0.4s ease-in-out;

  }
  #volumebtn{
    transition: 0.4s ease-in-out;
  }
  /* Responsive for PC/Desktop */
  @media (min-width: 900px) {
    .playbar {
      padding: 1.2rem 2.2rem;
      gap: 1.2rem;
      max-width: 420px;
      margin: 0 auto;
      border-radius: 1.5rem;
    }
    .playbar button {
      font-size: 1.4rem;
    }
    .slider {
      width: 180px;
    }
    .volume-slider {
      width: 90px;
    }
  }
  @media (max-width: 440px) and (max-height: 240px) {
    .playbar {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 0.3rem 0.5rem;
      gap: 0.5rem;
      min-width: 320px;
      max-width: 430px;
      min-height: 56px;
      background: #383838;
      border-radius: 1rem;
      box-shadow: 0 0 10px #cc92c444;
    }
    .tiny-cover {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 2px 8px #cc92c422;
      margin-right: 0.5rem;
    }
    .playbar button {
      font-size: 1.1rem;
      padding: 0.2rem;
    }
    .slider, .volume-slider {
      display: none;
    }
  }
</style> 
