import {
    CancelledError,
    isError,
    JsonError,
    Rejection,
    toRejection,
} from "@common/Errors"

import type { ILoadedBoard } from "@common/interfaces/IBoard"
import type { TAsyncResult } from "@common/interfaces/IIPCBridge"
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

export async function deleteBoard(id: string): TAsyncResult<true> {
    boardsStore.update((v) => {
        v = v.filter((e) => e.board.id !== id)
        return v
    })
    {
        let res = await IPC.deleteBoard(id)
        if (isError(res)) return toRejection(res)
    }
    return true
}
