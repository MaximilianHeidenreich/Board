/**
 * Functions which can be called through ipc comms.
 *
 */

import type { IData } from "@common/interfaces/IData"
import type { ISettings } from "@common/interfaces/ISettings"
import type { IBoard } from "@common/interfaces/IBoard"
import { SettingsDefault, DataDefault } from "@common/defaults"

import { app, dialog } from "electron"
import path from "path"
import { copy, mkdirs } from "fs-extra"
import md5File from "md5-file"
import { setDb, readDb } from "@main/Store"
import {
    EAssetType,
    fileExtensionToEAssetType,
} from "@common/interfaces/IAsset"

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
    let boarDir = path.join(DATA_DIR(), "boards", board.id)
    let assetsDir = path.join(boarDir, "assets")
    await mkdirs(boarDir)
    await mkdirs(assetsDir)
    return true
}
