import type { ISettings } from "@common/interfaces/ISettings"
import { createModel } from "sveltemodel/Model"
import { getSettings, setSettings } from "../ipcBridge"

export let settings = createModel<ISettings>({
    saveFn: async (o) => {
        try {
            let res = await setSettings(o) // TODO: impl err msgs into ipc funcs
            if (res) return {}
            else throw { msg: "Could not save settings!" }
        } catch (e) {
            console.error(e)
        }
        throw { msg: "sla" } // TODO!: Untanglet this bitch
    },
    loadFn: async () => {
        return await getSettings()
    },
    loadOnCreate: true,
})
