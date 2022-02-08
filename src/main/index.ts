import { app, BrowserWindow, systemPreferences } from "electron"
import { mkdirs } from "fs-extra"
import path from "path"
import { pathToFileURL } from "url"
import appIpcMain from "./ipcMain"

const isDevelopment = process.env.NODE_ENV === "development"

function createDataDir() {
    const DATA_DIR_STRUCTURE = ["boards"]
    DATA_DIR_STRUCTURE.forEach((p) =>
        mkdirs(path.join(app.getPath("documents"), "Board", p))
    )
}
createDataDir()

function createWindow() {
    const win = new BrowserWindow({
        title: "Board",
        width: 1280,
        height: 720,
        minWidth: 760,
        minHeight: 420,
        frame: false,
        titleBarStyle: "hiddenInset",
        webPreferences: {
            nodeIntegration: false,
            // contextIsolation: false, // protect against prototype pollution
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            webSecurity: false, // TODO!!!: DISABLE -> copy added resources into data folder
            preload: path.join(__dirname, "preload.js"),
        },
        show: false,
    }).once("ready-to-show", () => {
        win.show()
    })

    if (isDevelopment) {
        win.loadURL("http://localhost:3000")
        win.webContents.toggleDevTools()
    } else {
        win.loadURL(
            pathToFileURL(
                path.join(__dirname, "./renderer/index.html")
            ).toString()
        )
    }
    win.removeMenu()

    appIpcMain(win)

    // systemPreferences.on('accent-color-changed', (event, newColor) => {
    // 	console.log(`[theme] new Accent Color detected ${newColor}`);
    // 	win.webContents.send('fromAccentColor', newColor);
    // });
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
    return
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
