<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PlayBar from '../routes/components/PlayBar.svelte';

  const { Story } = defineMeta({
    title: 'Example/PlayBar',
    component: PlayBar,
    parameters: {
      layout: 'centered',
    },
  });
</script>

<Story name="Default" /> 