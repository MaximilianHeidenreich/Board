/**
 * Functions which can be called through ipc comms.
 *
 */

import type { IData } from "@common/interfaces/IData"
import type { ISettings } from "@common/interfaces/ISettings"
import {
    ELoadedBoardStatus,
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

let DATA_DIR = () => path.join(app.getPath("documents"), "Board")

/**
 * @returns The current app version
 */
export async function getVersion(): Promise<string> {
    return process.env.npm_package_version || "undefined"
}

/**
 * Sets the local settings file to given value.
 * @param data New value for file
 * @returns true if successful, false if not
 */
export async function setSettings(data: ISettings) {
    return setDb(data, {
        configName: "settings",
        dataPath: DATA_DIR(),
        defaults: SettingsDefault,
    })
}

/**
 * Reads the current settings file.
 * @returns The current settings value or undefined if unsuccessful
 */
export async function getSettings(): Promise<ISettings | undefined> {
    return readDb({
        configName: "settings",
        dataPath: DATA_DIR(),
        defaults: SettingsDefault,
    })
}

/**
 * Sets the local data file to fiven value.
 * @param data New value for file
 * @returns true if successful, false if not
 */
export async function setData(data: IData) {
    return setDb(data, {
        configName: "data",
        dataPath: DATA_DIR(),
        defaults: DataDefault,
    })
}

/**
 * Reads the current data file.
 * @returns The current data value or undefined if unsuccessful
 */
export async function getData(): Promise<IData | undefined> {
    return readDb({
        configName: "data",
        dataPath: DATA_DIR(),
        defaults: DataDefault,
    })
}

export interface GetFilesDialogResult {
    canceled: boolean
    filePaths: string[]
}
/**
 * Opens a file picker dialog.
 * @returns The picked files
 */
export async function getFilesDialog(): Promise<GetFilesDialogResult> {
    return await dialog.showOpenDialog({
        title: "Select file(s)",
        buttonLabel: "Select",
        properties: ["openFile", "multiSelections"], // TODO: Allow directory select
    })
}

export interface CopyFilesToAssetsDirResult {
    filePath: string
    assetPath: string
    assetHash: string
    assetType: EAssetType
}
/**
 * Copies multiple files into the assets directory of a board.
 * This automatically hashes them and renames them to their hash value!
 * @param filePaths The source files
 * @param board The board to use
 * @returns A list of objects that include metadata about the newly created asset
 */
export async function copyFilesToAssetsDir(
    filePaths: string[],
    boardId: string
): Promise<CopyFilesToAssetsDirResult[]> {
    let boarDir = path.join(DATA_DIR(), "boards", boardId)
    let assetsDir = path.join(boarDir, "assets")

    return await Promise.all<CopyFilesToAssetsDirResult>(
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
export async function mkBoardDataDir(board: IBoard): Promise<boolean> {
    let boardDir = path.join(DATA_DIR(), "boards", board.id)
    let assetsDir = path.join(boardDir, "assets")
    await mkdirs(boardDir)
    await mkdirs(assetsDir)
    return true
}

export async function createBoard(
    id: string,
    settings = { defaultLayout: EBoardLayout.grid, gridSize: 2, gridPadding: 2 }
): Promise<boolean> {
    let currBoards = await getBoards()

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

export async function getBoard(id: string): Promise<ILoadedBoard> {
    let boardDir = path.join(DATA_DIR(), "boards", id)
    // Load board.json
    let b
    try {
        b = JSON.parse(
            readFileSync(path.join(boardDir, "board.json")).toString()
        )
    } catch (error) {
        console.error(`Corrupted board ${boardDir}?`)
    }

    // Load userOverrides.json
    let o
    try {
        o = JSON.parse(
            readFileSync(path.join(boardDir, "userOverrides.json")).toString()
        )
    } catch (error) {
        console.error(`Corrupted board ${boardDir}?`)
    }

    return {
        board: b,
        userOverrides: o,
        status: ELoadedBoardStatus.LOADED,
    }
}

export async function getBoards(): Promise<ILoadedBoard[]> {
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

export async function updateBoard(
    id: string,
    mutation: { board?: Object; userOverrides?: Object }
): Promise<boolean> {
    let boardDir = path.join(DATA_DIR(), "boards", id)
    let board = await getBoard(id)

    let b = mutation.board || board.board
    let o = mutation.userOverrides || board.userOverrides

    // Update last modified
    // @ts-ignore
    b.modifiedAt = Date.now()

    /*console.trace(b)

    if (mutation.board) {
        Object.keys(mutation.board).forEach((k) => {
            // @ts-ignore
            b[k] = mutation[k]
            /*if (k in b) b[k] = mutation[k]
            else {
                console.warn(
                    `[updateBoard] Trying to mutate with unknown key '${k}'!`
                )
                console.trace(
                    `[updateBoard] Trying to mutate with unknown key '${k}'!`
                )
            }
        })
    }
    if (mutation.userOverrides) {
        Object.keys(mutation.userOverrides).forEach((k) => {
            // @ts-ignore
            o[k] = mutation[k]
            /*else {
                console.warn(
                    `[updateBoard] Trying to mutate with unknown key '${k}'!`
                )
                console.trace(
                    `[updateBoard] Trying to mutate with unknown key '${k}'!`
                )
            }
        })
    }*/

    writeFileSync(
        path.join(boardDir, "board.json"),
        JSON.stringify(b, undefined, 4)
    )
    writeFileSync(
        path.join(boardDir, "userOverrides.json"),
        JSON.stringify(o, undefined, 4)
    )

    return true
}
