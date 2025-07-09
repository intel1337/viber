import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  // iPhone 14 Pro dimensions (390 x 844 points, but use pixels for desktop)
  const win = new BrowserWindow({
    width: 390,
    height: 750,
    resizable: true,
    fullscreenable: false,
    frame: false, // No native OS window controls
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: '#000',
    show: false, // Don't show until ready
  });

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win.show();
  });

  // Remove the default menu
  Menu.setApplicationMenu(null);

  // IPC for custom window controls
  ipcMain.on('window-action', (event, action) => {
    console.log('Window action:', action); // Debug log
    if (action === 'close') win.close();
    if (action === 'minimize') win.minimize();
    if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize();
    if (action === 'resize-tiny') {
      if (win.isMaximized()) win.unmaximize();
      win.setResizable(true);
      win.setBounds({ width: 430, height: 230 });
    }
    if (action === 'resize-phone') {
      if (win.isMaximized()) win.unmaximize();
      win.setResizable(true);
      win.setBounds({ width: 390, height: 750 });
    }
  });

  // Load the Svelte app (assume Vite dev server for dev, or file for prod)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(join(__dirname, 'output/client/index.html'));
  }

  // Optional: Open DevTools in development


  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});