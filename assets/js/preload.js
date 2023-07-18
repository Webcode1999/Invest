const { ipcRenderer } = require('electron');
window.loadLocalFile = filePath => {
  ipcRenderer.send('load-page', filePath);
};