import type { IPromiseRejection } from "@common/interfaces/IPromises"
import { derived, writable } from "svelte/store"

interface BufferTask {
    id: number
}

const bufferTasks = writable<BufferTask[]>([])
export const bufferBusy = derived(bufferTasks, (v, set) => set(v.length > 0))

export function addTask() {
    bufferTasks.update((v) => {
        v.push({ id: 5 })
        return v
    })
}
export function finishTask() {
    bufferTasks.update((v) => {
        v.pop()
        return v
    })
}
export function onAfterBusy(action: (...args: any[]) => any): void {
    // TODO: ! Do it or not?
}

/**
 * Creates a buffered action.
 * One can call the returned many times,
 * but only after the last call exceedes the bufferTimeout, the action function will be called!
 * The bufferedPromise can be used to await for the action to be executed!
 * ! It will also update the busyBuffer
 *
 * @param action
 * @param bufferTimeout
 * @returns A promise which will be resolved after action is executed returning value from action
 * @throws { reason: "bufferedAction_cancelled" | valFromAction }
 */
export function createBufferedAction<T>(
    action: (...args: any[]) => Promise<T>,
    bufferTimeout = 3000
) {
    let busy = false
    let t: { promise: Promise<any> | undefined; cancel: (_: any) => void } = {
        promise: undefined,
        cancel: (_: any) => void 0,
    }

    const deferred = (bufferTimeout: number) => {
        let cancel: ((_: any) => void) | undefined = undefined
        let promise = new Promise<any>((resolve, reject) => {
            cancel = reject
            setTimeout(resolve, bufferTimeout)
            if (!busy) {
                addTask()
                busy = true
            }
        })
        return { promise, cancel }
    }

    return async (...args: any[]) => {
        try {
            t.cancel({ b: 333 })
            // @ts-ignore
            t = deferred(bufferTimeout)
            await t.promise
        } catch (_) {
            // prevent memory leak
            throw { reason: "bufferedAction_cancelled" }
        }
        try {
            let res = await action(...args)
            busy = false
            finishTask()
            return res
        } catch (e) {
            // prevent memory leak
            throw e
        }
    }
}

/*export function createBufferedAction<T>(
    action: (...args: any[]) => Promise<T>,
    bufferTimeout = 3000
) {
    let t: { promise: Promise<any> | undefined; cancel: (_: any) => void } = {
        promise: undefined,
        cancel: (_: any) => void 0,
    }
    let a: {
        promise: Promise<any> | undefined
        resolve: (_: any) => void
        cancel: (_: IPromiseRejection) => void
    } = {
        promise: undefined,
        resolve: (_: any) => void 0,
        cancel: (_: any) => void 0,
    }
    return {
        run: (() => {
            a.promise = new Promise<any>(async (resolve, reject) => {
                a.cancel = reject
                a.resolve = resolve
            })
            a.promise.catch((e) => console.error(e))
            let run = async (...args: any[]) => {
                try {
                    t.cancel({})
                    // @ts-ignore
                    t = deferred(bufferTimeout)
                    await t.promise

                    // a.promise = new Promise<any>(async (resolve, reject) => {
                    //     a.cancel = reject
                    //     try {
                    //         resolve(await action(...args))
                    //     } catch (e) {
                    //         reject(e)
                    //     }
                    // })
                    try {
                        a.resolve(await action(...args))
                    } catch (e) {
                        //@ts-ignore
                        a.cancel(e)
                    }
                    return a.promise
                } catch (_) {
                    // prevent memory leak
                    return
                }
            }
            return run
        })(),
        cancel: () => {
            a.cancel({ reason: "cancelled" })
        },
    }
}*/

/*export const createBufferedAction = <T>(
    action: (...args: any[]) => Promise<T>,
    bufferTimeout = 3000
) => {
    let timeout: number | undefined
    let runPResolver: (value: T) => void
    let runPRejecter: (rejection: IPromiseRejection) => void
    let runP: Promise<T | IPromiseRejection>

    // Wrapped action
    return {
        bufferedAction: (() => {


            const run = (() => {
                runP = new Promise<T | IPromiseRejection>((resolve, reject) => {
                    runPResolver = resolve
                    runPRejecter = reject
                })

                // Handle cancel
                runP.catch(() => {
                    console.warn("CANCELLED TASK")
                    finishTask()
                    clearTimeout(timeout)
                    timeout = undefined
                })

                return async (...theArgs: any[]) => {
                    if (timeout) {
                        clearTimeout(timeout)
                    } else {
                        addTask()
                    }

                    timeout = setTimeout(async () => {
                        let result = await action(...theArgs)
                        finishTask()

                        // Reset
                        timeout = undefined
                        runPResolver(result)
                    }, bufferTimeout)
                    return runP
                }
            })()

            const cancel = () => {
                if (runPRejecter) runPRejecter({ reason: "cancelled" })
            }

            return {
                run,
                cancel,
            }
        })(),
    }
}
*/
