<script lang="ts">

    import type { ICollection } from "@common/interfaces/ISettings";
    import CollectionsList from "./CollectionsList.svelte";
    import BoardFileButton from "./BoardFileButton.svelte";

    // STATE
    export let  collection: ICollection

    
</script>

<li class="mt-1">
    {#each collection.boards as boardId}
        <!--<li class="my-1 pr-8" 
            draggable="true"
            on:dragstart={(e) => {
                
                //if (e.dataTransfer) e.dataTransfer.setData("text/plain", boardId);
                if (e.dataTransfer) e.dataTransfer.setData("collectionObject", JSON.stringify({ type: "board", data: boardId }));
            }}
            on:dragend={() => {
                collection.boards = collection.boards.filter(e => e !== boardId)
            }}
            >
            <div class="flex gap-3 items-center">
                <svg class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <button class="text-base sch-medium text-neutral-600" on:click|preventDefault={() => openBoard(boardId)}>
                    {#await getTitle(boardId) then title}{title}{/await}
                </button>
            </div>
        </li>-->
        
        <BoardFileButton 
            bind:collection
            bind:boardId/>
        
    {/each}
    <CollectionsList
        inner={true}
        bind:collections={collection.subCollections}
        />
</li>