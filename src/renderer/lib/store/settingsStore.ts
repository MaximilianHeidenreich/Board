import { isError } from "@common/Errors"
import type { ISettings } from "@common/interfaces/ISettings"
import { createModel } from "sveltemodel/Model"
import IPC from "../ipc/ipcBridge"

export let settingsStore = createModel<ISettings>({
    saveFn: async (o) => {
        console.debug("[BufferedAction :: settingsStore] save()")
        let res = await IPC.setSettings(o)
        if (isError(res))
            return { msg: "Could not save settingsStore", meta: res }
        return {}
    },
    loadFn: async () => {
        console.debug("[BufferedAction :: settingsStore] loadFN()")
        let res = await IPC.getSettings()
        if (isError(res)) return undefined
        return res as ISettings
    },
    loadOnCreate: true,
})
