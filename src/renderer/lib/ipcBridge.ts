/**
 * Relay functions for all ipcFunctions.
 *
 */

import type { EAssetType } from "@common/interfaces/IAsset"
import type { IBoard } from "@common/interfaces/IBoard"
import type { IData } from "@common/interfaces/IData"
import type { ISettings } from "@common/interfaces/ISettings"

/**
 * @returns The current app version
 */
export async function getVersion(): Promise<string> {
    return (await window.main.get<string>("version"))[0]
}

/**
 * Sets the local settings file to given value.
 * @param data New value for file
 * @returns true if successful, false if not
 */
export async function setSettings(data: ISettings) {
    return (await window.main.get<boolean>("setSettings", undefined, data))[0]
}

/**
 * Reads the current settings file.
 * @returns The current settings value or undefined if unsuccessful
 */
export async function getSettings(): Promise<ISettings | undefined> {
    return (await window.main.get<ISettings>("getSettings"))[0]
}

/**
 * Sets the local data file to fiven value.
 * @param data New value for file
 * @returns true if successful, false if not
 */
export async function setData(data: IData) {
    return (await window.main.get<boolean>("setData", undefined, data))[0]
}

/**
 * Reads the current data file.
 * @returns The current data value or undefined if unsuccessful
 */
export async function getData(): Promise<IData | undefined> {
    return (await window.main.get<IData>("getData"))[0]
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
    return (await window.main.get<GetFilesDialogResult>("getFilesDialog"))[0]
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
    return (
        await window.main.get<CopyFilesToAssetsDirResult[]>(
            "copyFilesToAssetsDir",
            undefined,
            filePaths,
            boardId
        )
    )[0]
}

/**
 * Creates directory structure for given board in data dir.
 * @param board Board to get id from
 * @returns true if successful, false if not
 */
export async function mkBoardDataDir(board: IBoard): Promise<boolean> {
    return (
        await window.main.get<boolean>("mkBoardDataDir", undefined, board)
    )[0]
}
