import { getFileExtension } from "@common/util"

export enum EAssetType {
    "LOCAL_IMAGE",
    "URL_IMAGE",
    "UNKNOWN",
}
export function fileExtensionToEAssetType(file: string): EAssetType {
    // TODO!: All all supported extensions
    const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg"]

    let extension = getFileExtension(file)

    if (!extension) return EAssetType.UNKNOWN

    extension = extension.toLowerCase()
    if (IMAGE_EXTENSIONS.includes(extension)) return EAssetType.LOCAL_IMAGE

    return EAssetType.UNKNOWN
}

export interface IAsset {
    id: string
}
export interface IAssetLocalImage extends IAsset {
    assetPath: string
}
export let newIAssetLocalImage = (
    id: string,
    assetPath: string
): IAssetLocalImage => {
    return { id, assetPath }
}
