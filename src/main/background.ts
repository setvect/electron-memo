import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { app, BrowserWindow } from "electron";
const isDevelopment = process.env.NODE_ENV !== "production";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import MemoRepository from "./MemoRepository";
import { ipcMain } from "electron";

app.on("ready", async() => {
  const memoRepository = new MemoRepository();
  memoRepository.init();

  ipcMain.handle("listMemo", async() => {
    return await MemoRepository.listMemo();
  });

  ipcMain.handle("addMemo", async(event, memo) => {
    const instance = await MemoRepository.create(memo);
    return instance;
  });

  ipcMain.handle("deleteMemo", async(event, memoSeq: number) => {
    await MemoRepository.deleteMemo(memoSeq);
  });

  const window = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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
