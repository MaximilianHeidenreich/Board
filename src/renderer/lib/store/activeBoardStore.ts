import { isError, Rejection, toRejection } from "@common/Errors"
import { EAssetType, newIAssetLocalImage } from "@common/interfaces/IAsset"
import type { IAsset } from "@common/interfaces/IAsset"
import type { IBoard, ILoadedBoard } from "@common/interfaces/IBoard"
import { newIEntity } from "@common/interfaces/IEntity"
import type { IEntity } from "@common/interfaces/IEntity"
import type {
    ICopyFilesToAssetsDirResult,
    IGetFilesDialogResult,
    TAsyncResult,
} from "@common/interfaces/IIPCBridge"
import { writable, get } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import IPC from "../ipc/ipcBridge"
import { boardsStore } from "./boardsStore"
import { settingsStore } from "./settingsStore"
import { routeStore } from "./routeStore"

export const activeBoardIDStore = writable<string>()
export let activeBoardStore = createModel<ILoadedBoard>({
    //derived: activeBoardIDStore,

    saveFn: async (o) => {
        if (!o) return {}
        console.debug(
            "[BufferedAction :: activeBoardStore] saveFN() (o != undefined)"
        )
        o.board.modifiedAt = Date.now()

        // Update boards store -> Triggers file save
        boardsStore.update((v) => {
            let b = v.find((e) => e.board.id === o.board.id)

            if (!b) {
                console.error("!b in saveFn of activeBoard! should not happen")
                return v
            }

            let i = v.indexOf(b)
            v[i] = o
            return v
        })

        return {}
    },
    loadFn: async () => {
        console.debug("[BufferedAction :: activeBoardStore] loadFN()")
        let res = await IPC.getBoard(get(activeBoardIDStore))
        if (isError(res)) return undefined
        return res as ILoadedBoard
    },
    updateFn: (v) => {
        // TODO: Fix dis!
        console.warn("custom updater!!!!")

        v.board.modifiedAt = Date.now()
        return v
    },

    loadOnCreate: false,
})
activeBoardStore.initialized.then(() => {
    activeBoardIDStore.subscribe((v) => {
        let b = boardsStore.getById(v)
        if (b) activeBoardStore.set(b)
    })
})

/* MUTATION API */
/**
 * Opens a board by given id.
 * @param id The id of the board to open
 * @returns true if successful, false if not
 */
export async function openBoard(id: string): Promise<boolean | Rejection> {
    //let d = await get(data)
    //let b = d.boards.find((e) => e.id === id)

    let res = await IPC.getBoard(id)
    if (isError(res)) return toRejection(res)

    let board = res as ILoadedBoard
    return openBoardRaw(board.board, true)
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
    activeBoardIDStore.set(data.id)

    if (!updateLastOpened) return true

    // Save board as last opened
    settingsStore.mutate({ openBoardId: data.id })

    // Auto change view
    routeStore.set("/editor")

    return true
}

/**
 * Opens filepicker and adds selected files as entities.
 */
export async function importLocalEntityToActive(
    boardId: string
): TAsyncResult<true> {
    let files: IGetFilesDialogResult
    {
        let res = await IPC.getFilesDialog()
        if (isError(res)) return toRejection(res)
        files = res as IGetFilesDialogResult
    }

    let assets: ICopyFilesToAssetsDirResult
    {
        let res = await IPC.copyFilesToAssetsDir(files.filePaths, boardId)
        if (isError(res)) return toRejection(res)
        assets = res as ICopyFilesToAssetsDirResult
    }

    // Add entities for each asset.
    activeBoardStore.update((b) => {
        assets.forEach((a) => {
            let entityAsset: IAsset | undefined
            switch (a.assetType) {
                case EAssetType.LOCAL_IMAGE:
                    entityAsset = newIAssetLocalImage(a.assetID, a.assetPath)
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
                    gridPosition: b.board.entities.length + 1,
                })
                b.board.entities.push(entity)
            } else {
                console.trace("No entity asset! should not happen!")
            }
        })
        return b
    })
    /*boardsStore.update((d) => {
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
    })*/

    // Reload view
    /*{
        let b = boards.getById(boardId)
        if (b) activeBoard.set(b)
        else {
            // TODO: Err
            console.error("Not implemented!")
        }
    }*/
    return true
}

export async function removeEntityFromActive(
    entityId: string
): TAsyncResult<true> {
    // Remove asset
    let entity = get(activeBoardStore).board.entities.find(
        (e) => e.id === entityId
    )

    console.warn(entity)

    if (entity?.asset.id) {
        let res = await IPC.deleteAsset(
            get(activeBoardIDStore),
            entity?.asset.id
        )
        if (isError(res)) return toRejection(res)
    }

    // Remove from state
    activeBoardStore.update((v) => {
        v.board.entities = v.board.entities.filter((e) => e.id !== entityId)
        return v
    })
    return true
}
