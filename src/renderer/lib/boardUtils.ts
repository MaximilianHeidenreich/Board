/**
 * Helper functions to manage boards.
 */

import { EBoardLayout } from "@common/interfaces/EBoardLayout"
import { EAssetType, newIAssetLocalImage } from "@common/interfaces/IAsset"
import type { IAsset } from "@common/interfaces/IAsset"
import type { IBoard } from "@common/interfaces/IBoard"
import { newIEntity } from "@common/interfaces/IEntity"
import type { IEntity } from "@common/interfaces/IEntity"
import { uuidv4 } from "@common/util"
import { get } from "svelte/store"
import {
    copyFilesToAssetsDir,
    createBoard,
    getBoard,
    getBoards,
    getFilesDialog,
    mkBoardDataDir,
} from "./ipcBridge"
import { data } from "./store/dataStore"
import { settings } from "./store/settingsStore"
import { activeBoard, activeBoardId } from "./store/activeBoardStore"
import { boards } from "./store/boardsStore"

/**
 * Opens a board by given id.
 * @param id The id of the board to open
 * @returns true if successful, false if not
 */
export async function openBoard(id: string): Promise<boolean> {
    //let d = await get(data)
    //let b = d.boards.find((e) => e.id === id)

    let board = await getBoard(id)

    if (board) return openBoardRaw(board.board, true)
    else {
        console.error("openBoard !board")
        return false
    }
}

/**
 * Opens raw board data.
 * @param data Raw board data
 * @param updateLastOpened Whether to set the board as the last opened (will try to open on next app launch)
 * @returns true if successful, false if not
 */
export function openBoardRaw(
    data: IBoard,
    updateLastOpened: boolean = false
): boolean {
    activeBoardId.set(data.id)

    if (!updateLastOpened) return true

    // Save board as last opened
    settings.mutate({ openBoardId: data.id })

    return true
}

/**
 * Adds a new, empty board.
 * @returns The id of the newly created board
 */
export async function addNewBoard(autoOpen = false): Promise<string> {
    const id = uuidv4()
    const sett = await get(settings)

    // TIDOO IPC
    let res = await createBoard(id, {
        defaultLayout: sett.defaultBoardLayout,
        gridSize: sett.defaultBoardGridColumns,
        gridPadding: sett.defaultBoardGridPaddingFactor,
    })

    // Update data store
    /*let bs = (await getBoards()).map((e) => {
        return e.board
    })

    console.log("boards:")
    console.log(bs)*/

    boards.set(await getBoards())

    if (autoOpen) openBoard(id)

    return id
}

/**
 * Opens filepicker and adds selected files as entities.
 */
export async function importLocalAssets(boardId: string): Promise<boolean> {
    let files = await getFilesDialog()
    let assets = await copyFilesToAssetsDir(files.filePaths, boardId)
    console.log("assets:")
    console.log(assets)

    // Add entities for each asset.
    boards.update((d) => {
        assets.forEach((a) => {
            let boardIndex = d.indexOf(
                // @ts-ignore
                d.find((b) => b.board.id === boardId)
            )
            if (boardIndex < 0) {
                console.trace("null board") //TODO: Add error
                return
            }

            let entityAsset: IAsset | undefined
            switch (a.assetType) {
                case EAssetType.LOCAL_IMAGE:
                    entityAsset = newIAssetLocalImage(a.assetPath)
                    break
                default:
                    console.trace(
                        "default in switch assetType! SHOULT NOT HAPPEN"
                    )
                    break
            }

            if (entityAsset) {
                let entity: IEntity = newIEntity({
                    assetType: a.assetType,
                    asset: entityAsset,
                    gridPosition: d[boardIndex].board.entities.length + 1,
                })
                d[boardIndex].board.entities.push(entity)
            } else {
                console.trace("No entity asset! should not happen!")
            }
        })
        return d
    })

    // Reload view
    {
        let b = boards.getById(boardId)
        if (b) activeBoard.set(b)
    }

    return true
}

export async function removeEntityFromActive(
    entityId: string
): Promise<boolean> {
    // Remove from state
    activeBoard.update((v) => {
        v.board.entities = v.board.entities.filter((e) => e.id !== entityId)
        return v
    })

    return true
}
