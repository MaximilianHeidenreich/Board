import {
    CancelledError,
    isError,
    JsonError,
    Rejection,
    toRejection,
} from "@common/Errors"
import { EAssetType, newIAssetLocalImage } from "@common/interfaces/IAsset"
import type { IAsset } from "@common/interfaces/IAsset"
import type { ILoadedBoard } from "@common/interfaces/IBoard"
import { newIEntity } from "@common/interfaces/IEntity"
import type { IEntity } from "@common/interfaces/IEntity"
import type {
    ICopyFilesToAssetsDirResult,
    IGetFilesDialogResult,
    TAsyncResult,
} from "@common/interfaces/IIPCBridge"
import { uuidv4 } from "@common/util"
import { get } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import { openBoard } from "./activeBoardStore"
import { createBufferedAction } from "./bufferBusy"
import { settingsStore } from "./settingsStore"
import IPC from "../ipc/ipcBridge"

/**
 * Buffered save function which updates all boards.
 */
const saveFn = createBufferedAction<TAsyncResult<true>>(
    async (o: ILoadedBoard[]) => {
        console.debug("[BufferedAction] Calling boardsStore::saveFN", o)

        if (!o) return true

        for (const b of o) {
            let res = await IPC.updateBoard(b.board.id, {
                board: b.board,
                userOverrides: b.userOverrides,
            })

            if (isError(res)) return res
        }
        return true
    }
)

export const boardsStore = (() => {
    const { subscribe, update, mutate, set, get, load, initialized } =
        createModel<ILoadedBoard[]>({
            saveFn: async (o) => {
                console.debug(
                    "[BufferedAction :: boardsStore] Queing boardsStore::saveFN"
                )

                let res = await saveFn(o)
                if (isError(res)) {
                    let error = (res as Rejection).toError()
                    if (error instanceof CancelledError) {
                        console.debug(
                            "[BufferedAction :: boardsStore] Cancelled saveFN"
                        )
                    } else if (error instanceof JsonError) {
                        // TODO: Handle other errors
                        console.warn("JSON asldl")
                    }

                    return { msg: "Could not save boardsStore", meta: res }
                }
                return {}
            },
            loadFn: async () => {
                console.debug("[BufferedAction :: boardsStore] loadFN()")
                let res = await IPC.getBoards()
                if (isError(res)) return undefined
                return res as ILoadedBoard[]
            },
            loadOnCreate: true,
        })

    /*const activeBoard = writable<ILoadedBoard | undefined>() // TODO!!: Necessarry!?
    subscribe(() => {
        activeBoard.set(get()?.find((e) => e.board.id === sGet(activeBoardId)))
    })*/

    return {
        subscribe,
        update,
        mutate,
        set,
        get,
        getById: (id: string) => get()?.find((e) => e.board.id === id),

        load,
        initialized,
    }
})()

/* MUTATION API */
/**
 * Adds a new, empty board.
 * @returns The id of the newly created board
 */
export async function addNewBoard(autoOpen = false): TAsyncResult<string> {
    const id = uuidv4()
    const settings = get(settingsStore)

    {
        let res = await IPC.createBoard(id, {
            defaultLayout: settings.defaultBoardLayout,
            gridSize: settings.defaultBoardGridColumns,
            gridPadding: settings.defaultBoardGridPaddingFactor,
        })
        if (isError(res)) return toRejection(res)
    }

    // Update data store
    /*let bs = (await getBoards()).map((e) => {
        return e.board
    })*/

    let bs
    {
        let res = await IPC.getBoards()
        if (isError(res)) return toRejection(res)
        bs = res as ILoadedBoard[]
    }

    boardsStore.set(bs)

    if (autoOpen) openBoard(id)

    return id
}

/**
 * Opens filepicker and adds selected files as entities.
 */
export async function importLocalAssets(boardId: string): TAsyncResult<true> {
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
    boardsStore.update((d) => {
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
