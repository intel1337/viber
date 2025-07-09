import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		allowedHosts: ['viber.aetherweb.dev'],
		// ... other server options ...
	  },
	  preview: {
		allowedHosts: ['viber.aetherweb.dev'],
		// ... autres options preview ...
	  }
});

