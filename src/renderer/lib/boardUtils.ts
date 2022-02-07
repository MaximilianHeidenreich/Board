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
    getFilesDialog,
    mkBoardDataDir,
} from "./ipcBridge"
import { data } from "./store/dataStore"
import { settings } from "./store/settingsStore"
import { activeBoardId } from "./store/activeBoardStore"

/**
 * Opens a board by given id.
 * @param id The id of the board to open
 * @returns true if successful, false if not
 */
export async function openBoard(id: string): Promise<boolean> {
    let d = await get(data)
    let b = d.boards.find((e) => e.id === id)

    if (b) return openBoardRaw(b, true)
    else {
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
    // Useful when loading board from external source in future
    activeBoardId.set(data.id)

    if (!updateLastOpened) return true

    // Save board as last opened
    settings.mutate({ openBoard: data.id })

    return true
}

/**
 * Adds a new, empty board.
 * @returns The id of the newly created board
 */
export async function addNewBoard(): Promise<string> {
    const id = uuidv4()

    let nBoard = {
        // Metadata
        id,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        title: `Untitled board #${(await get(data).boards.length) + 1}`,
        description: "An empty place for your ideas and inspiration.",
        members: "",

        // Settings
        defaultLayout: EBoardLayout.grid,
        gridSize: get(settings).userGridColumns,
        gridPadding: get(settings).userGridPaddingFactor,
        notesShown: false,

        // Sync

        // Content
        headerImage: "",
        entities: [],
    }

    data.update((d) => {
        let dd = d
        dd.boards.push(nBoard)
        return dd
    })

    await mkBoardDataDir(nBoard)

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
    data.update((d) => {
        assets.forEach((a) => {
            let boardIndex = d.boards.indexOf(
                // @ts-ignore
                d.boards.find((b) => b.id === boardId)
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
                let entity: IEntity = newIEntity(a.assetType, entityAsset)
                d.boards[boardIndex].entities.push(entity)
            } else {
                console.trace("No entity asset! should not happen!")
            }
        })
        return d
    })

    return true
}
