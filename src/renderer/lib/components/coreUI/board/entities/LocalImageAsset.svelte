<script lang="ts">
    import type { IAsset, IAssetLocalImage } from "@common/interfaces/IAsset";
    import { createEventDispatcher } from "svelte";

    // STATE
    export let asset: IAsset
    export let a = asset as IAssetLocalImage    // Workaround to make configiton render based on enum possible
    const dispatch = createEventDispatcher()
</script>

<img src="file://{a.assetPath}" alt="{a.assetPath}" on:load={() => dispatch("load")} class="w-full">