const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

const fullscreen = process.argv.includes('--fullscreen') || process.argv.includes('-f');
const debug = process.argv.includes('--debug');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    backgroundColor: 'black',
    width: 1280,
    height: 720,
    fullscreen,
    titleBarStyle: "hidden",
    ...(process.platform !== 'darwin' ? { titleBarOverlay: { color: 'black', symbolColor: 'white', height: '15px' } } : {})
  });

  if (debug) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.setTitle('BBC iPlayer');
  mainWindow.loadURL('http://bbc.co.uk/iplayer');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar { width: 0px; }
      #orbit-header { position: sticky; top: 0; z-index: 2000; background: #000C; }
      .orb-nav-pri { app-region: drag; backdrop-filter: blur(10px); background:transparent !important; }
      .orbit-header-links { display: none !important; }
      .orbit-header-right { margin-left: 0 !important; }
      .orb-nav-pri-container { justify-content: normal !important; }
      .orb-nav-pri-container > * { app-region: no-drag; }
      .orb-nav-blocks { app-region: drag; pointer-events: none; }
    `);
    if (process.platform === 'darwin') {
      mainWindow.webContents.insertCSS(`
        .orb-nav-blocks { margin-left: 90px !important; }
      `);
    }
  });
});