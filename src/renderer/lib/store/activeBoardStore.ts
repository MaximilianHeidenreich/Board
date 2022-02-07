import type { IBoard } from "@common/interfaces/IBoard"
import { writable, derived } from "svelte/store"
import { data } from "./dataStore"

// ! Do not mutate directly! only use with boardUtils !
export const activeBoardId = writable<string>()
export const activeBoard = derived(
    [activeBoardId, data],
    ([$activeBoardId, $data]) => {
        return $data?.boards?.find((b) => b.id === $activeBoardId) || undefined
    }
)
