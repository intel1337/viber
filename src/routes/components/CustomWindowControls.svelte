<script>
  import Fa from 'svelte-fa';
  import { faTimes, faMinus, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
  

  // Only works in Electron
  function send(action) {
    if (window && window.electronAPI) {
      window.electronAPI.windowAction(action);
    } else if (window && window.require) {
      // Fallback for nodeIntegration
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('window-action', action);
    }
  }

  let now = new Date();
  let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updateTime = () => {
    now = new Date();
    time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const interval = setInterval(updateTime, 1000);
  // Clean up interval if component is destroyed
  import { onDestroy } from 'svelte';

  onDestroy(() => clearInterval(interval));

  let battery = 100
  setInterval(()=>{
    if(battery===0){
      battery+=100;
    }else{
      battery-=1
    }
  
},10000)

</script>

<div class="window-controls-bar">
  <div class="window-controls">
    <button class="close" aria-label="Fermer" on:click={() => send('close')}><Fa icon={faTimes} /></button>
    <button class="minimize" aria-label="Réduire" on:click={() => send('minimize')}><Fa icon={faMinus} /></button>
  </div>
  <div class="window-status">
    <span class="clock">{time}</span>
    <span class="battery"><Fa icon={faBatteryFull} /> {battery}%</span>
  </div>
</div>

<style>
.window-controls-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  -webkit-app-region: drag;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background: transparent;
  justify-content: space-between;
}
.window-controls {
  display: flex;
  gap: 0.7rem;
}
.window-controls button {
  -webkit-app-region: no-drag;
  background: rgba(255, 178, 236, 0.85); 
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: black;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #ffb2ec44;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.window-controls button:hover {
  background: #ff6ddf;
  transform: scale(1.1);
}
.window-controls .close:hover {
  background: #ff6d8f;
}
.window-status {
  display: flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  align-items: center;
  gap: 1.2rem;
  margin-right: 18px;
  font-size: 1rem;
  color: #fff;
  user-select: none;
}
.clock {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
}
.battery {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #fff;
}
.battery :global(svg) {
  color: #fff;
  font-size: 1.2rem;
}
</style> 