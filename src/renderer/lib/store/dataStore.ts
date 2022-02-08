import type { IBoard } from "@common/interfaces/IBoard"
import type { IData } from "@common/interfaces/IData"
import { get } from "svelte/store"
import { createModel } from "sveltemodel/Model"
import { getData, setData } from "../ipcBridge"
import { boards } from "./boardsStore"

export let data = createModel<IData>({
    saveFn: async (o) => {
        let res = await setData(o) // TODO: impl err msgs into ipc funcs
        if (res) return {}
        else throw { msg: "Could not save data!" }
    },
    loadFn: async () => {
        return await getData()
    },
    loadOnCreate: true,
})
