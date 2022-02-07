<script lang="ts">
    import { EAssetType } from "@common/interfaces/IAsset";
    import type { IAssetLocalImage } from "@common/interfaces/IAsset";
    import type { IEntity } from "@common/interfaces/IEntity";

    import LocalImageAsset from "./LocalImageAsset.svelte";

    export let entity: IEntity
</script>

<div class="entity bg-neutral-100">
    {#if entity.assetType === EAssetType.LOCAL_IMAGE}
        <LocalImageAsset 
            asset={entity.asset}
            />
    {/if}
</div>
