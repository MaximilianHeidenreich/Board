<script lang="ts">
    import type { IAsset, IAssetLocalImage } from "@common/interfaces/IAsset";


    export let asset: IAsset
    export let a = asset as IAssetLocalImage    // Workaround to make configiton render based on enum possible
</script>

<img src="file://{a.assetPath}" alt="{a.assetPath}" class="w-full">