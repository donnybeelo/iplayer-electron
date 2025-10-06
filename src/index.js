const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

const fullscreen = process.argv.includes('--fullscreen') || process.argv.includes('-f');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    backgroundColor: 'black',
    width: 1280,
    height: 720,
    fullscreen,
    titleBarStyle: "hidden",
    ...(process.platform !== 'darwin' ? { titleBarOverlay: { color: '#000000', symbolColor: '#ffffff', height: '15px' } } : {})
  });

  mainWindow.setTitle('BBC iPlayer');
  mainWindow.loadURL('http://bbc.co.uk/iplayer');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.on('page-title-updated', () => {
    mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar { width: 0px; }
      #orbit-header { app-region: drag; position: sticky; top: 0; z-index: 2000; }
      .orbit-header-links { display: none !important; }
      .orbit-header-right { margin-left: 0 !important; }
      .orb-nav-pri-container { justify-content: normal !important; }
      .orb-nav-pri-container > * { app-region: no-drag; }
      .orb-nav-blocks { app-region: drag; pointer-events: none; }
    `);
  })
});