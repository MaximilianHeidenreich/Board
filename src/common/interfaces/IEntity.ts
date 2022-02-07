import { uuidv4 } from "@common/util"
import type { EAssetType, IAsset } from "./IAsset"

export interface IEntity {
    // Metadata
    createdAt: number
    modifiedAt: number
    id: string

    // Asset
    assetType: EAssetType
    asset: IAsset

    // Map
    locX: number
    locY: number
}
export let newIEntity = (
    assetType: EAssetType,
    asset: IAsset,
    locX = 0,
    locY = 0,
    createdAt?: number,
    modifiedAt?: number,
    id?: string
): IEntity => {
    return {
        createdAt: createdAt || Date.now(),
        modifiedAt: modifiedAt || Date.now(),
        id: id || uuidv4(),
        assetType,
        asset,
        locX,
        locY,
    }
}
