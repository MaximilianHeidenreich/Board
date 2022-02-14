/**
 * All functions which can be called over ipc.
 * These need to be implemented inside the ipcBridge.ts file & ipcFunctions.ts file
 */

import type { Rejection } from "@common/Errors"
import type { EBoardLayout } from "./EBoardLayout"
import type { EAssetType } from "./IAsset"
import type { ILoadedBoard } from "./IBoard"
import type { ISettings } from "./ISettings"

// Function types
export type TGet<T> = () => Promise<T | Rejection> // Unly use for function declarations
export type TAsyncResult<T> = Promise<T | Rejection> // Use TAsyncResult<true> on fns with no special trturn value

// Function arg / return interfaces
export interface IGetFilesDialogResult {
    canceled: boolean
    filePaths: string[]
}

export interface ICopyFilesToAssetsDirResult
    extends Array<{
        filePath: string
        assetID: string
        assetPath: string
        assetHash: string
        assetType: EAssetType
    }> {}

export interface ICreateBoardOptions {
    defaultLayout: EBoardLayout
    gridSize: number
    gridPadding: number
}

// Bridge interface
export interface IIPCBridge {
    // CORE

    /**
     * Opens a url in the default browser.
     */
    openExternal: (url: string) => TAsyncResult<true>

    /**
     * @returns The current app version
     * @throws {NotFoundError}
     */
    getVersion: TGet<string>

    /**
     * Reads the current settings file.
     * @returns The current settings value or undefined if unsuccessful
     * @throws {ReadFileError, JsonError, UncaughtError}
     */
    getSettings: TGet<ISettings>

    /**
     * Sets the local settings file to given value.
     * @param data New value for file
     * @returns true if successful, false if not
     * @throws {InvalidArgumentError, ReadFileError, UncaughtError}
     */
    setSettings: (data: ISettings) => TAsyncResult<true>

    // FILE SYSTEM
    getFilesDialog: TGet<IGetFilesDialogResult>

    // ASSETS
    copyFilesToAssetsDir: (
        filePaths: string[],
        boardId: string
    ) => TAsyncResult<ICopyFilesToAssetsDirResult>
    deleteAsset: (boardID: string, assetID: string) => TAsyncResult<true>

    // BOARDS
    createBoard: (
        id: string,
        options: ICreateBoardOptions
    ) => TAsyncResult<true>

    deleteBoard: (id: string) => TAsyncResult<true>

    /**
     *
     * @param id
     * @returns
     * @throws {JsonError}
     */
    getBoard: (id: string) => TAsyncResult<ILoadedBoard>

    getBoards: TGet<(ILoadedBoard | Rejection)[]>

    updateBoard: (
        id: string,
        mutation: { board?: any; userOverrides?: any }
    ) => TAsyncResult<true>
}
