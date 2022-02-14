import { CancelledError, isError, JsonError, Rejection } from "@common/Errors"
import type { TAsyncResult } from "@common/interfaces/IIPCBridge"
import type { ISettings } from "@common/interfaces/ISettings"
import { createModel } from "sveltemodel/Model"
import IPC from "../ipc/ipcBridge"
import { createBufferedAction } from "./bufferBusy"

/**
 * Buffered save function which updates settings.json file over ipc
 */
const saveFn = createBufferedAction<TAsyncResult<true>>(
    async (o: ISettings) => {
        console.debug("[BufferedAction] Calling settingsStore::saveFN", o)

        if (!o) return true

        let res = await IPC.setSettings(o)
        if (isError(res)) return res
        return true
    }
)

export let settingsStore = createModel<ISettings>({
    saveFn: async (o) => {
        console.debug(
            "[BufferedAction :: settingsStore] Queing settingsStore::saveFN"
        )

        let res
        try {
            res = await saveFn(o)
        } catch (e) {
            console.log(e)
        }
        if (isError(res)) {
            let error = (res as Rejection).toError()
            if (error instanceof CancelledError) {
                console.debug(
                    "[BufferedAction :: settingsStore] Cancelled saveFN"
                )
            } else if (error instanceof JsonError) {
                // TODO: Handle other errors
                console.warn("JSON asldl")
            } else {
                throw res
            }

            return { msg: "Could not save settingsStore", meta: res }
        }
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
