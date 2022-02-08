import { uuidv4 } from "@common/util"
import type { EAssetType, IAsset } from "./IAsset"

export interface IEntity {
    // Metadata
    createdAt: number
    modifiedAt: number
    id: string

    // Grid
    gridPosition: number

    // Asset
    assetType: EAssetType
    asset: IAsset

    // Map
    locX: number
    locY: number
}
export let newIEntity = (o: {
    assetType: EAssetType
    asset: IAsset
    locX?: number
    locY?: number
    createdAt?: number
    modifiedAt?: number
    id?: string
    gridPosition?: number
}): IEntity => {
    return {
        createdAt: o.createdAt || Date.now(),
        modifiedAt: o.modifiedAt || Date.now(),
        id: o.id || uuidv4(),
        gridPosition: o.gridPosition || 0,
        assetType: o.assetType,
        asset: o.asset,
        locX: o.locX || 0,
        locY: o.locY || 0,
    }
}
