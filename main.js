const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

// global reference to window object
let win;

function createWindow() {
    // create browser window
    win = new BrowserWindow({
        width: 1080,
        height: 720,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // load index.html
    // win.loadFile('index.html');

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    // load localhost
    win.loadURL(startUrl);

    // open DevTools
    win.webContents.openDevTools();

    // on window close
    win.on('closed', () => {
        // delete current window
        win = null;
    })
}

// finished initialization, create browser windows
app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});