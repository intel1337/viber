<script>
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import MusicCard from "./components/MusicCard.svelte";
    import CustomWindowControls from "./components/CustomWindowControls.svelte";
    import PlayBar from "./components/PlayBar.svelte";
    import TinyMode from "./components/TinyMode.svelte";
    import { onMount } from 'svelte';
    import { isTinyMode } from './components/isTinyMode.js';

    function checkTinyMode() {
      isTinyMode.set(window.innerWidth <= 440 && window.innerHeight <= 240);
    }
    onMount(() => {
      window.scrollTo({ top: 50, behavior: 'smooth' });
      checkTinyMode();
      window.addEventListener('resize', checkTinyMode);
      // Block all scrolling except system scrollbar
      const blockScroll = (e) => {
        if (e.type === 'wheel' || e.type === 'touchmove' || e.type === 'keydown') {
          if (!(e.target === document.documentElement || e.target === document.body)) {
            e.preventDefault();
          }
        }
      };
      window.addEventListener('wheel', blockScroll, { passive: false });
      window.addEventListener('touchmove', blockScroll, { passive: false });
      window.addEventListener('keydown', (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', ' ', 'Home', 'End'];
        if (keys.includes(e.key)) {
          blockScroll(e);
        }
      }, { passive: false });
      return () => {
        window.removeEventListener('resize', checkTinyMode);
        window.removeEventListener('wheel', blockScroll);
        window.removeEventListener('touchmove', blockScroll);
        window.removeEventListener('keydown', blockScroll);
      };
    });
</script>

{#if $isTinyMode}
  <TinyMode />
{:else}
  <Header/>
  <CustomWindowControls />
  <section>
      <MusicCard></MusicCard>
  </section>
  <Footer/>
{/if}

<style>
    html, body {
        background: rgb(50, 50, 50);
    }
    section{
        height: 100vh;
        background-color: rgb(50, 50, 50);
    }
  


</style>