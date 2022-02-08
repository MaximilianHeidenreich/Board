import type { IBoard, ILoadedBoard } from "@common/interfaces/IBoard"
import { writable, derived, get } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import { getBoard, getBoards, updateBoard } from "../ipcBridge"
import { boards } from "./boardsStore"
import { data } from "./dataStore"

// ! Do not mutate directly! only use with boardUtils !
export const activeBoardId = writable<string>()

export let activeBoard = createModel<ILoadedBoard>({
    derived: activeBoardId,

    saveFn: async (o) => {
        o.board.modifiedAt = Date.now()

        // Update boards store -> Triggers file save
        boards.update((v) => {
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
        let activeId = get(activeBoardId)

        let res = await getBoard(activeId)

        /*console.log(
            "da: " + get(boards).find((e) => e.board.id === activeId)?.board
        )

        return get(boards).find((e) => e.board.id === activeId)?.board*/
        return res
    },
    updateFn: (v) => {
        // TODO: Fix dis!
        console.warn("custom updater!!!!")

        v.board.modifiedAt = Date.now()
        return v
    },

    loadOnCreate: false,
})
