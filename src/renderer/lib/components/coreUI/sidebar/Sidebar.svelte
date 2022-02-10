<script lang="ts">
    import { fly } from "svelte/transition";
    import { quadInOut } from "svelte/easing";

    import type { ISettings } from "@common/interfaces/ISettings";
    import { addNewBoard, boardsStore, deleteBoard } from "@renderer/lib/store/boardsStore";
import { get } from "svelte/store";

    import { router, active } from "tinro";
    import BoardFileButton from "./BoardFileButton.svelte";
    import CollectionsSection from "./CollectionsSection.svelte";
import { sidebarIsDragActiveStore } from "@renderer/lib/store/sidebarStateStore";
import IconDelete from "../icons/IconDelete.svelte";
import type { ILoadedBoard } from "@common/interfaces/IBoard";

    // STATE
    export let  settings: ISettings,
                shown = false

    let unsortedBoards: ILoadedBoard[]
    $: if ($boardsStore) unsortedBoards = get(boardsStore)

</script>

{#if shown}
<aside class="schUI w-max py-12 bg-neutral-100 border-r-2 flex flex-col gap-4" transition:fly="{{ x: -300, duration: 300, easing: quadInOut }}">
    <header class="px-8 flex justify-between items-center ">
        <div>
            <h3 class="sch-bold">Board</h3>
        </div>
    </header>
    <div class="h-full">
        <div class="px-4 mb-6">
            <input type="text" placeholder="Jump to..." class="sch-medium py-2 px-3 w-full border-2 rounded-xl focus:outline-none focus:border-neutral-300 bg-white text-sm">
        </div>

        <div class="w-max ">
            <!-- Routes -->
            <ul>
                <li class="py-2">
                    <button class="pl-8" on:click|preventDefault={() => router.goto("/editor") }>
                        <div class="flex gap-3 items-center">
                            <svg class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span class="text-base sch-medium text-neutral-600">Editor</span>
                        </div>
                    </button>
                </li>
                <li class="py-2 bg-neutral-200">
                    <button class="pl-8" on:click|preventDefault={() => router.goto("/settings") }>
                        <div class="flex gap-3 items-center">
                            <svg class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span class="text-base sch-medium text-neutral-600">Settings</span>
                        </div>
                    </button>
                </li>
            </ul>

            <CollectionsSection 
                bind:collections={settings.collections}/>
            
            <!-- Other boards -->
            <section class="px-8">
                <div class=" flex gap-8 justify-between items-center">
                    <span class="text-base sch-medium text-neutral-500">Unsorted boards</span>
                    <button on:click|preventDefault={async () => { await addNewBoard() }}>
                        <svg class="feather feather-folder text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

               <ul>
                    
                        {#each $boardsStore as board}
                        <BoardFileButton
                            collection={undefined}
                            boardId={board.board.id}
                            title={board.board.title}/> 
                        {/each}
                   
               </ul>
            </section>
        </div>
    </div>
    <footer class="relative">
        <!-- TODO: Footer? -->

        <!-- Trash -->
        {#if $sidebarIsDragActiveStore}
        <div class="border-2 rounded-lg bg-neutral-200 p-4 px-6 flex flex-col items-center gap-1 absolute" style="left: 50%;bottom: 0; transform: translate(-50%, 20%)"
            on:drop|preventDefault={async (e) => {
                let s = e.dataTransfer?.getData("collectionObject")
                let data
                try {
                    if (s) data = JSON.parse(s)
                    else {
                        console.warn("CollectionListCollapsable !s from dataTransfer!")
                        return // TODO: poperror
                    }
                }
                catch (e) {
                    // TODO: Popup error
                    console.warn("CollectionListCollapsable JSON Parse error from dataTransfer!", s)
                    return // TODO: poperror
                }
                
                if (data.type === "board") {
                    if (data.data) await deleteBoard(data.data)
                
                }
                else if (data.type === "collection") {
                    //if (data.data) collection.subCollections.push(data.data)
                }

                e.dataTransfer?.clearData()
                sidebarIsDragActiveStore.set(false)
            }}
            on:dragover|preventDefault={() => {}}
            >
            <IconDelete size={28}/>
            Delete
        </div>
        {/if}
    </footer>
</aside>
{/if}

<style lang="postcss">
</style>