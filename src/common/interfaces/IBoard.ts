import type { IEntity } from "@common/interfaces/IEntity"
import type { EBoardLayout } from "./EBoardLayout"

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
