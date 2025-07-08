# Viber Music Player

A modern, cute, and responsive music player built with SvelteKit and Electron, styled for an iPhone-like look. Features a custom pink UI, cross-component state sync, and a fully custom window chrome for desktop.

---

## Features

- **SvelteKit + Electron**: Runs as a web app or a desktop app.
- **iPhone Layout**: Fixed-size, borderless window with custom draggable top bar.
- **Custom Window Controls**: Cute pink close/minimize buttons, live clock, and battery indicator.
- **Music Playback**: Play, pause, next, previous, and volume control.
- **Dynamic Track Info**: Album art, title, and artist update everywhere when the track changes.
- **Cross-Component State**: All player state (track, progress, volume, etc.) is shared via a Svelte store.
- **Storybook**: For component development and documentation.

---

## Getting Started

### 1. Install dependencies
```sh
pnpm install
```

### 2. Add your music
- Place your `.mp3` files in `static/music/`.
- Edit `src/lib/musicdb.json` to add your tracks:
  ```json
  [
    {
      "path": "music/supershy.mp3",
      "image": "https://...",
      "artist": "NewJeans",
      "title": "Super Shy"
    },
    ...
  ]
  ```

### 3. Run in Development (Web + Electron)
- Start the SvelteKit dev server:
  ```sh
  pnpm run dev
  ```
- In another terminal, launch Electron:
  ```sh
  npx electron .
  ```
  or
  ```sh
  pnpm run electron
  ```

### 4. Build for Production
- Build the SvelteKit app:
  ```sh
  pnpm run build
  ```
- The output will be in `output/client/`.
- Electron will load this automatically in production mode.

---

## Project Structure

- `src/routes/components/PlayBar.svelte` — Main player controls (play, pause, next, prev, volume, progress)
- `src/routes/components/MusicCard.svelte` — Displays current track info and progress
- `src/routes/components/CustomWindowControls.svelte` — Custom draggable top bar with window controls, clock, and battery
- `src/lib/playerStore.js` — Svelte store for all player state (shared across components)
- `src/lib/musicdb.json` — List of tracks (edit this to add your own music)
- `electron.js` — Electron main process (window, IPC, etc.)
- `preload.js` — Electron preload script (security)

---

## Customization

- **Add tracks**: Edit `src/lib/musicdb.json` and add your `.mp3` files to `static/music/`.
- **Change theme**: Edit CSS in the Svelte components for your own color scheme.
- **Window controls**: Customize `CustomWindowControls.svelte` for more icons or info.
- **Component development**: Use Storybook (`pnpm run storybook`) to develop and test UI components in isolation.

---

## Notes
- The app is designed for a fixed iPhone-like window (390x750px by default).
- All window controls are custom; the native OS chrome is hidden.
- The app is fully reactive: changing track, progress, or volume updates everywhere instantly.
- For best results, use Electron to get the full desktop experience.

---

## License
MIT
