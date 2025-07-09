<script>
    import Fa from 'svelte-fa';
    import {faMusic} from '@fortawesome/free-solid-svg-icons'
    import PlayBar from './PlayBar.svelte';
</script>
<div class="header">
     <PlayBar></PlayBar>
</div>

<style>
    .header{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, bold;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        width: 100%;
        background-color: transparent;
        color: white;
        gap: 1%;
        height: 10vh;
        bottom: 0;
        position: sticky;
    }

</style>