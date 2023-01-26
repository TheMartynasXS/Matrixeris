const { app, BrowserWindow } = require("electron");

const createWindow = (htmlDir) => {
  const mainWindow = new BrowserWindow({
    width: 750,
    minWidth: 800,
    minHeight: 550,
    height: 550,
    backgroundColor: "#3a3b41",
    icon: "icon.ico",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(htmlDir);
  mainWindow.webContents.openDevTools({ mode: "detach" })
  // mainWindow.removeMenu();
};

app.whenReady().then(() => {
  createWindow("src/Matrixeris.html");
});

app.setAppUserModelId("Matrixeris");
