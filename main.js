const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path');

let win; 

ipcMain.on('load-page', (event, filePath) => {
  if (win) {
    win.loadFile(filePath);
  }
});

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, './assets/images/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
