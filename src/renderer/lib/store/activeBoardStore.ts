import { isError, Rejection, toRejection } from "@common/Errors"
import type { IBoard, ILoadedBoard } from "@common/interfaces/IBoard"
import { writable, get } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import IPC from "../ipc/ipcBridge"
import { boardsStore } from "./boardsStore"
import { settingsStore } from "./settingsStore"

export const activeBoardIDStore = writable<string>()
export let activeBoardStore = createModel<ILoadedBoard>({
    derived: activeBoardIDStore,

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
        //let b = boardsStore.getById(v)
        //if (b) activeBoardStore.set(b)
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

    return true
}

export async function removeEntityFromActive(
    entityId: string
): Promise<boolean> {
    // Remove from state
    activeBoardStore.update((v) => {
        v.board.entities = v.board.entities.filter((e) => e.id !== entityId)
        return v
    })
    return true
}
