<script lang="ts">
    import type { ICollection } from "@common/interfaces/ISettings";
    import CollectionListCollapsable from "./CollectionListCollapsable.svelte";

    // STATE
    export let  collections: ICollection[],
                inner = false
</script>

<!-- Collections -->
<ul {...$$restProps}>
    {#each collections as collection}
        <CollectionListCollapsable 
            inner={inner}
            bind:outerCollections={collections}
            bind:collection/>
    {/each}
</ul>

<style lang="postcss">

</style>