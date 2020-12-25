import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { app, BrowserWindow } from "electron";
const isDevelopment = process.env.NODE_ENV !== "production";

app.on("ready", async () => {
  let window = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (isDevelopment) {
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
  } else {
    createProtocol("app")
    window.loadURL("app://./index.html")
  }
  window.on("closed", () => {
    app.quit();
  });
});
