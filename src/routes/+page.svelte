<script>
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import MusicCard from "./components/MusicCard.svelte";
    import CustomWindowControls from "./components/CustomWindowControls.svelte";

</script>

<Header/>
<CustomWindowControls />

<section>
    <MusicCard></MusicCard>

</section>
<Footer/>

<style>
    section{
        height: 100vh;
        background-color: rgb(255, 225, 255);
    }
  


</style>