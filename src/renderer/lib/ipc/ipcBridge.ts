/**
 * Relay functions for all ipcFunctions.
 */

import type { Rejection } from "@common/Errors"
import { EBoardLayout } from "@common/interfaces/EBoardLayout"
import type { ILoadedBoard } from "@common/interfaces/IBoard"
import type {
    ICopyFilesToAssetsDirResult,
    ICreateBoardOptions,
    IGetFilesDialogResult,
    IIPCBridge,
    TAsyncResult,
} from "@common/interfaces/IIPCBridge"
import type { ISettings } from "@common/interfaces/ISettings"

async function getVersion(): TAsyncResult<string> {
    return (await window.main.get<string | Rejection>("getVersion"))[0]
}

async function getSettings(): TAsyncResult<ISettings> {
    return (await window.main.get<ISettings | Rejection>("getSettings"))[0]
}

async function setSettings(data: ISettings): TAsyncResult<true> {
    let res = await window.main.get<true | Rejection>(
        "setSettings",
        undefined,
        data
    )
    return res[0]
}

async function getFilesDialog(): TAsyncResult<IGetFilesDialogResult> {
    let res = await window.main.get<IGetFilesDialogResult | Rejection>(
        "getFilesDialog"
    )
    return res[0]
}

async function copyFilesToAssetsDir(
    filePaths: string[],
    boardId: string
): TAsyncResult<ICopyFilesToAssetsDirResult> {
    return (
        await window.main.get<ICopyFilesToAssetsDirResult | Rejection>(
            "copyFilesToAssetsDir",
            undefined,
            filePaths,
            boardId
        )
    )[0]
}

/*export function mkBoardDataDir(board: IBoard): Promise<boolean> {
    return (
        await window.main.get<boolean>("mkBoardDataDir", undefined, board)
    )[0]
}*/

async function createBoard(
    id: string,
    settings: ICreateBoardOptions = {
        defaultLayout: EBoardLayout.grid,
        gridSize: 2,
        gridPadding: 2,
    }
): TAsyncResult<true> {
    let res = await window.main.get<true | Rejection>(
        "createBoard",
        undefined,
        id,
        settings
    )
    return res[0]
}
async function deleteBoard(id: string): TAsyncResult<true> {
    let res = await window.main.get<true | Rejection>(
        "deleteBoard",
        undefined,
        id
    )
    return res[0]
}

async function getBoard(id: string): TAsyncResult<ILoadedBoard> {
    let res = await window.main.get<ILoadedBoard | Rejection>(
        "getBoard",
        undefined,
        id
    )
    return res[0]
}
async function getBoards(): TAsyncResult<ILoadedBoard[]> {
    let res = await window.main.get<ILoadedBoard[] | Rejection>("getBoards")
    return res[0]
}

async function updateBoard(
    id: string,
    mutation: { board?: Object; userOverrides?: Object }
): TAsyncResult<true> {
    let res = await window.main.get<true | Rejection>(
        "updateBoard",
        undefined,
        id,
        mutation
    )
    return res[0]
}

const IPC: IIPCBridge = {
    getVersion,
    getSettings,
    setSettings,

    getFilesDialog,
    copyFilesToAssetsDir,

    createBoard,
    deleteBoard,
    getBoard,
    getBoards,
    updateBoard,
}
export default IPC
