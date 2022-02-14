import {
    BrowserWindow,
    ipcMain,
    systemPreferences,
    clipboard,
    shell,
} from "electron"
import IPC from "./ipcFunctions"

interface ipcSendReceive {
    receive: string
    send: string
    name: string
}

export const preloadChannels = [
    "ping",
    "openExternal",
    "getVersion",

    "getSettings",
    "setSettings",
    "getData",
    "setData",

    "getFilesDialog",
    "copyFilesToAssetsDir",
    "deleteAsset",

    "createBoard",
    "deleteBoard",
    "getBoard",
    "getBoards",
    "updateBoard",
]

/*
	main.get("ping") -> Return value (["pong"])

*/

function mainIpcFunction(
    name: ipcSendReceive["name"],
    event: Electron.IpcMainEvent,
    ...args: any[]
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        /*console.log(
            `[mainIpc] Function ${name} with args: [${args
                .map((e) => JSON.stringify(e))
                .join(", ")}]`
        )*/
        console.log(
            `[mainIpc] Function ${name} with args: [${args.join(", ")}]`
        )
        switch (name) {
            case "ping":
                resolve("pong")
                break
            case "openExternal":
                if (!args[0]) {
                    console.log("Tried to openExternal with no value!")
                    reject("Tried to openExternal with no value!")
                }
                await shell.openExternal(args[0]) // TODO: Catch error
                resolve(true)
                break
            case "getVersion":
                resolve(await IPC.getVersion())
                break

            case "getSettings":
                resolve(await IPC.getSettings())
                break
            // Sets the settings db to given value.
            case "setSettings":
                if (!args[0]) {
                    console.log("Tried to set settings db with no value!")
                    reject("Tried to set settings db with no value!")
                }
                resolve(await IPC.setSettings(args[0]))
                break
            case "getFilesDialog":
                resolve(await IPC.getFilesDialog())
                break

            case "copyFilesToAssetsDir":
                if (args.length !== 2) {
                    console.error(
                        "Tried to copyFilesToDataDir with insufficient args!"
                    )
                    return
                }
                let files: string[] = args[0]
                let boardId: string = args[1]

                resolve(IPC.copyFilesToAssetsDir(files, boardId))
                break
            case "deleteAsset":
                if (args.length !== 2) {
                    console.error(
                        "Tried to deleteAsset with insufficient args!"
                    )
                    return
                }
                resolve(await IPC.deleteAsset(args[0], args[1]))
                break

            case "createBoard":
                if (args.length < 1) {
                    console.error("Tried to call createBoard with no value!")
                    return
                }
                let createOp = await IPC.createBoard(args[0], args[1])
                createOp ? resolve(true) : reject(createOp)
                break
            case "deleteBoard":
                if (args.length < 1) {
                    console.error("Tried to call deleteBoard with no value!")
                    return
                }
                let deleteOp = await IPC.deleteBoard(args[0])
                deleteOp ? resolve(true) : reject(deleteOp)
                break

            case "getBoard":
                if (!args[0]) {
                    console.error("Tried to call getBoards with no value!")
                    return
                }
                resolve(await IPC.getBoard(args[0]))
                break
            case "getBoards":
                resolve(await IPC.getBoards())
                break
            case "updateBoard":
                if (args.length !== 2) {
                    console.error("Tried to call updateBoard with no value!")
                    return
                }
                resolve(await IPC.updateBoard(args[0], args[1]))
                break

            case "clippy":
                console.debug("Copying to clipboard: " + args[0])
                clipboard.writeText(args[0])
                break

            default:
                resolve("none")
                break
        }
    })
}

export function validChannels(string: string) {
    const validChannels: string[] = []
    preloadChannels.forEach((v) => {
        validChannels.push(generateNameChannel(v, string))
    })
    return validChannels
}

export function generateNameChannel(channel: string, string: string) {
    return `${string}${channel.charAt(0).toUpperCase() + channel.slice(1)}`
}

const mainIpcChannels: ipcSendReceive[] = []

const validFromChannels = validChannels("from")
const validToChannels = validChannels("to")
for (let i = 0; i < validFromChannels.length; i++) {
    mainIpcChannels.push({
        send: validFromChannels[i],
        receive: validToChannels[i],
        name: preloadChannels[i],
    })
}

export default function appIpcMain(win: BrowserWindow) {
    mainIpcChannels.forEach((channel) => {
        ipcMain.on(channel.receive, async (event, args) => {
            const data = await mainIpcFunction(channel.name, event, ...args)

            win.webContents.send(channel.send, data)
        })
    })
}
