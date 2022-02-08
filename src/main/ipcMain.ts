import { BrowserWindow, ipcMain, systemPreferences, clipboard } from "electron"
import type { IBoard } from "@common/interfaces/IBoard"
import {
    copyFilesToAssetsDir,
    createBoard,
    getBoard,
    getBoards,
    getData,
    getFilesDialog,
    getSettings,
    getVersion,
    mkBoardDataDir,
    setData,
    setSettings,
    updateBoard,
} from "./ipcFunctions"

interface ipcSendReceive {
    receive: string
    send: string
    name: string
}

export const preloadChannels = [
    "ping",
    "version",

    "getSettings",
    "setSettings",
    "getData",
    "setData",

    "getFilesDialog",
    "copyFilesToAssetsDir",
    "mkBoardDataDir",

    "createBoard",
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
            case "version":
                resolve(await getVersion())
                break

            // Sets the settings db to given value.
            case "setSettings":
                if (!args[0]) {
                    console.log("Tried to set settings db with no value!")
                    reject("Tried to set settings db with no value!")
                }
                resolve(await setSettings(args[0]))
                break
            case "getSettings":
                resolve(await getSettings())
                break
            case "setData":
                if (!args[0]) {
                    console.error("Tried to set data db with no value!")
                    return
                }
                resolve(await setData(args[0]))
                break
            case "getData":
                resolve(await getData())
                break

            case "getFilesDialog":
                resolve(await getFilesDialog())
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

                resolve(copyFilesToAssetsDir(files, boardId))
                break

            case "mkBoardDataDir":
                if (!args[0]) {
                    console.error("Tried to call mkBoardDataDir with no value!")
                    return
                }
                resolve(await mkBoardDataDir(args[0]))
                break

            case "createBoard":
                if (args.length < 1) {
                    console.error("Tried to call createBoard with no value!")
                    return
                }
                let op = await createBoard(args[0], args[1])
                op ? resolve(true) : reject(op)
                break
            case "getBoard":
                if (!args[0]) {
                    console.error("Tried to call getBoards with no value!")
                    return
                }
                resolve(await getBoard(args[0]))
                break
            case "getBoards":
                resolve(await getBoards())
                break
            case "updateBoard":
                if (args.length !== 2) {
                    console.error("Tried to call updateBoard with no value!")
                    return
                }
                resolve(await updateBoard(args[0], args[1]))
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
