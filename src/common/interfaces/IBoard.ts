import type { IEntity } from "@common/interfaces/IEntity"
import type { EBoardLayout } from "./EBoardLayout"
import type { IUserOverrides } from "./IUserOverrides"

export interface IBoard {
    // Metadata
    id: string
    createdAt: number
    modifiedAt: number
    title: string
    description: string
    members: string

    // Settings
    defaultLayout: EBoardLayout // For online viewers and if shared
    gridSize: number
    gridPadding: number
    notesShown: boolean

    // Sync

    // Content
    headerImage: string
    entities: IEntity[]
}

export enum ELoadedBoardStatus {
    "LOADED",
    "CORRUPTED",
}
export enum ELoadedBoardType {
    "LOCAL",
    "REMOTE",
}
export interface ILoadedBoard {
    board: IBoard
    userOverrides: IUserOverrides
    status: ELoadedBoardStatus
    type: ELoadedBoardType
}
