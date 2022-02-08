import type { IBoard, ILoadedBoard } from "@common/interfaces/IBoard"
import { get as sGet, writable } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import { getBoards, updateBoard } from "../ipcBridge"
import { activeBoardId } from "./activeBoardStore"
import { createBufferedAction } from "./bufferBusy"
import { data } from "./dataStore"

/*const { bufferedAction: saveFn } = createBufferedAction(
    async (o: ILoadedBoard[]) => {
        console.log("buffered O: ", o)

        o.forEach(async (b) => {
            let res = await updateBoard(b.board.id, {
                board: b.board,
                userOverrides: b.userOverrides,
            }) // TODO: impl err msgs into ipc funcs
            if (res) return {}
            else throw { msg: "Could not save data!" }
        })
    }
)*/
const saveFn = createBufferedAction(async (o: ILoadedBoard[]) => {
    console.log("buffered O: ", o)

    o.forEach(async (b) => {
        let res = await updateBoard(b.board.id, {
            board: b.board,
            userOverrides: b.userOverrides,
        }) // TODO: impl err msgs into ipc funcs
        if (res) return true
        else throw { msg: "Could not save data!" }
    })
    return true
})

export const boards = (() => {
    const { subscribe, update, mutate, set, get, load, initialized } =
        createModel<ILoadedBoard[]>({
            saveFn: async (o) => {
                try {
                    let re = saveFn(o)
                    console.log("svRes: ", await re)
                } catch (e) {
                    console.log("canceled!: ", e)
                }

                return {}
            },
            loadFn: async () => {
                return await getBoards()
            },
            loadOnCreate: true,
        })

    const activeBoard = writable<ILoadedBoard | undefined>()
    subscribe(() => {
        activeBoard.set(get()?.find((e) => e.board.id === sGet(activeBoardId)))
    })

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

/*export function addBoard(board: IBoard) {
    boards.update((v) => {
        v.push(board)
        return v
    })
}*/

/*export async function getBoard(id: string): Promise<IBoard | undefined> {
    return (await get(data)).boards.find((b) => b.id === id)
}
*/
