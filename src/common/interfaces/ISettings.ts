import type { EBoardLayout } from "./EBoardLayout"

export interface ICollection {
    name: string
    expanded: boolean
    boards: string[]
    subCollections: ICollection[]
}

export interface ISettings {
    // Application
    windowBounds: {
        width: number
        height: number
    }

    // User
    displayName: string

    // App state
    openBoardId: string
    sidebarShown: boolean
    collections: ICollection[]

    // Board view
    defaultBoardLayout: EBoardLayout
    defaultBoardGridColumns: number
    defaultBoardGridPaddingValue: number // Base padding (e.g. 1rem) which gets multiplied with userGridPadding to get final padding
    defaultBoardGridPaddingUnit: string
    defaultBoardGridPaddingFactor: number
}
