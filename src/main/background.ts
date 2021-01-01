import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { app, BrowserWindow } from "electron";
const isDevelopment = process.env.NODE_ENV !== "production";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

app.on("ready", async() => {
  const window = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (isDevelopment) {
    await installExtension(VUEJS_DEVTOOLS);
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    window.webContents.openDevTools();
  } else {
    createProtocol("app");
    window.loadURL("app://./index.html");
  }
  window.on("closed", () => {
    app.quit();
  });
});
