import type { EBoardLayout } from "./EBoardLayout"

export interface IUserOverrides {
    layout: EBoardLayout
    gridSize: number
    gridPadding: number

    // Location in sidebar list (e.g. # || #myFolder#test)
    sidebarFolderPath: string
    //commentsPanelPinned: boolean
}
