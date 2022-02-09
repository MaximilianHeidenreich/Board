/**
 * Functions which can be called through ipc comms.
 *
 */

import type { IData } from "@common/interfaces/IData"
import type { ISettings } from "@common/interfaces/ISettings"
import {
    ELoadedBoardStatus,
    ELoadedBoardType,
    IBoard,
    ILoadedBoard,
} from "@common/interfaces/IBoard"
import { SettingsDefault, DataDefault } from "@common/defaults"

import { app, dialog } from "electron"
import path from "path"
import { readdir } from "fs/promises"
import { copy, mkdirs, readFileSync, writeFileSync } from "fs-extra"
import md5File from "md5-file"
import { setDb, readDb } from "@main/Store"
import {
    EAssetType,
    fileExtensionToEAssetType,
} from "@common/interfaces/IAsset"
import { EBoardLayout } from "@common/interfaces/EBoardLayout"
import type { IUserOverrides } from "@common/interfaces/IUserOverrides"
import type {
    ICopyFilesToAssetsDirResult,
    IGetFilesDialogResult,
    IIPCBridge,
    TAsyncResult,
} from "@common/interfaces/IIPCBridge"
import {
    AppError,
    InvalidArgumentError,
    isError,
    JsonError,
    NotFoundError,
    ReadFileError,
    Rejection,
    toRejection,
    UncaughtError,
    UnhandledRejection,
} from "@common/Errors"

let DATA_DIR = () => path.join(app.getPath("documents"), "Board")

async function getVersion(): TAsyncResult<string> {
    return process.env.npm_package_version || new NotFoundError().toRejection() // TODO: Fix in packaged app
}

async function getSettings(): TAsyncResult<ISettings> {
    try {
        return readDb({
            configName: "settings",
            dataPath: DATA_DIR(),
            defaults: SettingsDefault,
        })
    } catch (e: any) {
        if (e instanceof ReadFileError) {
            return new Rejection("ReadFileError", e.message, {
                file: e.file,
            })
        } else if (e instanceof JsonError) {
            return new Rejection("JsonError", e.message, {
                json: e.json,
            })
        } else {
            return new UncaughtError(e).toRejection()
        }
    }
}

async function setSettings(data: ISettings): TAsyncResult<true> {
    try {
        return setDb(data, {
            configName: "settings",
            dataPath: DATA_DIR(),
            defaults: SettingsDefault,
        })
    } catch (e: any) {
        if (e instanceof InvalidArgumentError) {
            return e.toRejection()
        } else if (e instanceof ReadFileError) {
            return e.toRejection()
        } else {
            return new UncaughtError(e).toRejection()
        }
    }
}

/**
 * Sets the local data file to fiven value.
 * @param data New value for file
 * @returns true if successful, false if not
 */
/*export async function setData(data: IData) {
    return setDb(data, {
        configName: "data",
        dataPath: DATA_DIR(),
        defaults: DataDefault,
    })
}*/

/**
 * Reads the current data file.
 * @returns The current data value or undefined if unsuccessful
 */
/*export async function getData(): Promise<IData | undefined> {
    return readDb({
        configName: "data",
        dataPath: DATA_DIR(),
        defaults: DataDefault,
    })
}*/

/**
 * Opens a file picker dialog.
 * @returns The picked files
 */
async function getFilesDialog(): TAsyncResult<IGetFilesDialogResult> {
    return await dialog.showOpenDialog({
        // TODO: try
        title: "Select file(s)",
        buttonLabel: "Select",
        properties: ["openFile", "multiSelections"], // TODO: Allow directory select
    })
}

/**
 * Copies multiple files into the assets directory of a board.
 * This automatically hashes them and renames them to their hash value!
 * @param filePaths The source files
 * @param board The board to use
 * @returns A list of objects that include metadata about the newly created asset
 */
async function copyFilesToAssetsDir(
    filePaths: string[],
    boardId: string
): TAsyncResult<ICopyFilesToAssetsDirResult> {
    // TODO: try
    let boarDir = path.join(DATA_DIR(), "boards", boardId)
    let assetsDir = path.join(boarDir, "assets")

    return await Promise.all(
        filePaths.map(async (p) => {
            let fileExtension = p.split(".").pop() || "" //p.split(".")[p.split(".").length - 1]
            let fileHash = await md5File(p)
            let assetPath = `${path.join(assetsDir, fileHash)}.${fileExtension}`

            await copy(p, `${path.join(assetsDir, fileHash)}.${fileExtension}`)
            // TODO: Send msg to rendere to display status
            return {
                filePath: p,
                assetPath: assetPath,
                assetHash: fileHash,
                assetType: fileExtensionToEAssetType(fileExtension),
            }
        })
    )
}

/**
 * Creates directory structure for given board in data dir.
 * @param board Board to get id from
 * @returns true if successful, false if not
 */
async function mkBoardDataDir(board: IBoard): Promise<boolean> {
    // TODO: try
    let boardDir = path.join(DATA_DIR(), "boards", board.id)
    let assetsDir = path.join(boardDir, "assets")
    await mkdirs(boardDir)
    await mkdirs(assetsDir)
    return true
}

async function createBoard(
    id: string,
    settings = { defaultLayout: EBoardLayout.grid, gridSize: 2, gridPadding: 2 }
): TAsyncResult<true> {
    let res = await getBoards()
    if (isError(res)) return toRejection(res)
    let currBoards = res as (ILoadedBoard | Rejection)[]

    // TODO: exception
    if (isError(currBoards)) {
        console.error("unhandled: ipcCreteBoard imp")
        return UnhandledRejection()
    }

    let nBoard = {
        // Metadata
        id,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        title: `Untitled board #${currBoards.length + 1}`,
        description: "An empty place for your ideas and inspiration.",
        members: "",

        // Settings
        defaultLayout: settings.defaultLayout,
        gridSize: settings.gridSize,
        gridPadding: settings.gridPadding,
        notesShown: false,

        // Sync

        // Content
        headerImage: "",
        entities: [],
    }
    let overrides: IUserOverrides = {
        layout: settings.defaultLayout,
        gridSize: settings.gridSize,
        gridPadding: settings.gridPadding,
    }

    await mkBoardDataDir(nBoard)

    let boardDir = path.join(DATA_DIR(), "boards", nBoard.id)
    writeFileSync(
        path.join(boardDir, "board.json"),
        JSON.stringify(nBoard, undefined, 4)
    )
    writeFileSync(
        path.join(boardDir, "userOverrides.json"),
        JSON.stringify(overrides, undefined, 4)
    )

    // add to data
    /*let data = await getData()
    console.log("data: ")
    console.log(data)

    data?.localBoardIds.push({ id })
    if (data) await setData(data)*/

    return true
}

async function getBoard(id: string): TAsyncResult<ILoadedBoard> {
    let boardDir = path.join(DATA_DIR(), "boards", id)
    // Load board.json
    let boardFile = readFileSync(path.join(boardDir, "board.json")).toString() // TODO: Catch
    let b
    try {
        b = JSON.parse(boardFile)
    } catch (e) {
        return new JsonError(
            "Could not parse board.json",
            e,
            boardFile
        ).toRejection()
    }

    // Load userOverrides.json
    let overridesFile = readFileSync(
        path.join(boardDir, "userOverrides.json")
    ).toString()
    let o
    try {
        o = JSON.parse(overridesFile)
    } catch (e) {
        return new JsonError(
            "Could not parse userOverrides.json",
            e,
            boardFile
        ).toRejection()
    }

    return {
        board: b,
        userOverrides: o,
        status: ELoadedBoardStatus.LOADED,
        type: ELoadedBoardType.LOCAL,
    }
}

async function getBoards(): TAsyncResult<(ILoadedBoard | Rejection)[]> {
    let boardsDir = path.join(DATA_DIR(), "boards")
    let boardIds = (await readdir(boardsDir, { withFileTypes: true }))
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    let boardsDirs = boardIds.map((id) => {
        return { id, path: path.join(boardsDir, id) }
    }) // TODO: Can be removed we only need ids

    // Load every board
    let boards = await Promise.all(
        boardsDirs.map(async (d) => await getBoard(d.id))
    )

    return boards
}

async function updateBoard(
    id: string,
    mutation: { board?: Object; userOverrides?: Object }
): TAsyncResult<true> {
    let boardDir = path.join(DATA_DIR(), "boards", id)
    try {
        let board = (await getBoard(id)) as ILoadedBoard
        let b = mutation.board || board.board
        let o = mutation.userOverrides || board.userOverrides

        // Update last modified
        // @ts-ignore
        b.modifiedAt = Date.now()

        writeFileSync(
            path.join(boardDir, "board.json"),
            JSON.stringify(b, undefined, 4)
        )
        writeFileSync(
            path.join(boardDir, "userOverrides.json"),
            JSON.stringify(o, undefined, 4)
        )

        return true
    } catch (e) {
        // TODO: impl
        return new UncaughtError("ipcUpdateBoard unimplemented!").toRejection()
    }
}

const IPC: IIPCBridge = {
    getVersion,
    getSettings,
    setSettings,

    getFilesDialog,
    copyFilesToAssetsDir,
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
}
export default IPC
