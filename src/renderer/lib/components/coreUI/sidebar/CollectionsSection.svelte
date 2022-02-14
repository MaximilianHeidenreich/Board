<script lang="ts">
import type { IFolder } from "@common/interfaces/ISettings";
import CollectionsList from "./FolderTree.svelte";



    // STATE
    export let collections: IFolder[]
    let remountList: number = 1

    // API
    /*function addEmptyCollection() {
        collections.push({
            name: "Untitled Collection",
            expanded: false,
            boards: [],
            subCollections: []
        })
        remountList = Math.random()
    }*/

</script>

<!-- Collections -->
<section class="collectionsSection px-8">
    <div class="flex gap-8 justify-between items-center">
        <span class="text-base sch-medium text-neutral-500">Collections</span>
        <button on:click|preventDefault={() => 0}>
            <svg class="feather feather-folder text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>
    </div>

    <!--{#key remountList}
    <CollectionsList 
        class="py-3"
        inner={false}
        bind:collections/>
    {/key}-->
</section>

<style lang="postcss">
    :global(.collectionsSection ul > li) {
        @apply ml-7;
    }
    :global(.collectionsSection li > ul > li) {
        @apply ml-7;
    }
</style>