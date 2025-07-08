<script>
    import PlayBar from "./PlayBar.svelte";
    import { playerState } from '../../lib/playerStore.js';
    import { onMount } from "svelte";
    import musicdb from '$lib/musicdb.json';
    onMount(()=>{
    })
    let progress, duration, trackIndex;
    playerState.subscribe(state => {
        progress = state.progress;
        duration = state.duration;
        trackIndex = state.trackIndex;
    });
    let track;
    $: track = musicdb[trackIndex];
    function onSliderInput(e) {
        playerState.update(state => ({ ...state, progress: +e.target.value }));
    }
    function formatTime(sec) {
        sec = Math.floor(sec);
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }
</script>


<section>
    <div class="card">
        <img id="cover" src={track.image} alt="Cover">
    </div>
    <div class="flexb">
        <div class="opt">
            <div class="desc">
                <h3>{track.title}</h3>
                
            </div>
            
            <p style="text-align: center;"><strong>{track.artist}</strong></p>
            <div class="slider-row">
                <span class="slider-time">{formatTime(progress)}</span>
                <input type="range" min="0" max={duration} value={progress} on:input={onSliderInput} class="slider song-slider" />
                <span class="slider-time">{formatTime(duration)}</span>
            </div>
           </div>
    </div>
   
</section>


<!-- CSS -->
<style>
    section{

        overflow-x: none;
        overflow-y: none;
        overflow: hidden;
        color: white;
        height: 90vh;
        background-color: rgb(50, 50, 50);
        width: 100%;

    }
    .flexb{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s ease-in-out;
        width:auto;
    }
    .flexb:hover{
        scale: 1.05;
    }
    .card{
    
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

    }
    #cover{
        margin-top: 10%;
        max-width: 350px;
        border-radius: 5%;
        box-shadow: 0 0 70px #cc92c444;
        transition: 0.5s ease-in-out;
        scale: 0.9;

    }
    #cover:hover{
        scale: 0.95;

    }
    .desc{

        font-size: large;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
        
    }
    .opt{
        margin-top: 3%;
        padding: 1%;
        width: 80%;
        background-color: rgb(59, 59, 59);
        height: 150px;
        border-radius: 20px;
        box-shadow: 0 0 0 2px #cc92c444;

       
    }



    .song-slider {
        width: 80%;
        margin: 2rem auto 0 auto;
        display: block;
        height: 4px;
        background: transparent;
        border: none;
        border-radius: 10px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
    }
    .song-slider:focus {
        box-shadow: 0 0 0 2px #cc92c444;
    }
    .song-slider::-webkit-slider-runnable-track {
        height: 4px;
        background: #cc92c4;
        border-radius: 10px;
    }
    .song-slider::-webkit-slider-thumb {
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
    .song-slider:active::-webkit-slider-thumb,
    .song-slider:focus::-webkit-slider-thumb {
        border: 2px solid #ff6ddf;
        box-shadow: 0 0 0 4px #cc92c422;
    }
    .song-slider::-moz-range-track {
        height: 4px;
        background: #cc92c4;
        border-radius: 10px;
    }
    .song-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #cc92c4;
        box-shadow: 0 2px 6px #cc92c422;
        cursor: pointer;
        transition: border 0.2s, box-shadow 0.2s;
    }
    .song-slider:active::-moz-range-thumb,
    .song-slider:focus::-moz-range-thumb {
        border: 2px solid #ffb2ec;
        box-shadow: 0 0 0 4px #cc92c422;
    }
    .song-slider::-ms-fill-lower {
        background: #cc92c4;
        border-radius: 10px;
    }
    .song-slider::-ms-fill-upper {
        background: #cc92c4;
        border-radius: 10px;
    }
    .song-slider::-ms-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #cc92c4;
        box-shadow: 0 2px 6px #cc92c422;
        cursor: pointer;
        transition: border 0.2s, box-shadow 0.2s;
    }
    .song-slider:active::-ms-thumb,
    .song-slider:focus::-ms-thumb {
        border: 2px solid rgb(255, 169, 228);
        box-shadow: 0 0 0 4px #cc92c422;
    }
    .song-slider:focus::-ms-fill-lower {
        background: #cc92c444;
    }
    .song-slider:focus::-ms-fill-upper {
        background: #cc92c444;
    }
    .song-slider::-moz-focus-outer {
        border: 0;
    }
    .slider-row {
        display: flex;
        justify-self: center;
        align-items: center;
        gap: 1rem;
        width: 100%
    }
    .slider-time {
        color: #ffb2ec;
        font-size: 1rem;
        min-width: 40px;
        text-align: center;
    }
</style>