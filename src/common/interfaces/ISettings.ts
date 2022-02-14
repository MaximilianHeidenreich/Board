import type { EBoardLayout } from "./EBoardLayout"

export interface IFolder {
    [key: string]: IFolder
}

export interface ISettings {
    // Application
    windowBounds: {
        width: number
        height: number
    }

    // User
    displayName: string
    licenseKey: string

    // App state
    openBoardId: string
    sidebarShown: boolean
    favourites: string[]
    folders: { [key: string]: {} }[]

    // Board view
    defaultBoardLayout: EBoardLayout
    defaultBoardGridColumns: number
    defaultBoardGridPaddingValue: number // Base padding (e.g. 1rem) which gets multiplied with userGridPadding to get final padding
    defaultBoardGridPaddingUnit: string
    defaultBoardGridPaddingFactor: number
}
