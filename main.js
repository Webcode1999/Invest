const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');

// expressApp.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from Express!' });
// });


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, './assets/images/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('index.html')

  //  win.setMenu(null)
}

app.whenReady().then(() => {
  createWindow()
})
