<script lang="ts">
    import { fly } from "svelte/transition";
    import { quadInOut } from "svelte/easing";

    import type { ISettings } from "@common/interfaces/ISettings";
    import { addNewBoard, boardsStore, deleteBoard } from "@renderer/lib/store/boardsStore";
    import { get } from "svelte/store";

    import { sidebarIsDragActiveStore } from "@renderer/lib/store/sidebarStateStore";
    import IconDelete from "../icons/IconDelete.svelte";
    import type { ILoadedBoard } from "@common/interfaces/IBoard";
    import SearchCover from "./SearchCover.svelte";
    import { routeStore } from "@renderer/lib/store/routeStore";
    import SidebarButton from "./SidebarButton.svelte";
    import FavouritesExpandable from "./FavouritesExpandable.svelte";
    import IPC from "@renderer/lib/ipc/ipcBridge";
    import FolderTree from "./FolderTree.svelte";
import FolderBoardButton from "./FolderBoardButton.svelte";
import Divider from "../utils/Divider.svelte";
import IconSearch from "../icons/IconSearch.svelte";
import IconPen from "../icons/IconPen.svelte";
import IconCog from "../icons/IconCog.svelte";

    // STATE
    export let  settings: ISettings,
                shown = false

    let searchOpen = false

    let unsortedBoards: ILoadedBoard[]
    $: if ($boardsStore) unsortedBoards = get(boardsStore)

    let tree = {
        parent: null,
        name: "#root",
        childBoards: [ "3f95329f-7ec6-4c04-ba8e-007bc0ce179c" ],
        childFolders: [
            {
                parent: null,
                name: "/level1",
                childBoards: [ "61f9fd06-50ff-495d-b409-4ec224e007b9"],
                childFolders: []
            },
            {
                parent: null,
                name: "/level1",
                childBoards: [ "61f9fd06-50ff-495d-b409-4ec224e007b9", "0380658d-6a37-4f6f-a4c5-580cff414ba4" ],
                childFolders: [
                    {
                        parent: null,
                        name: "/level1/level2",
                        childBoards: [],
                        childFolders: []
                    }
                ]
            }
        ]
    }

</script>

<SearchCover bind:open={searchOpen}/>

{#if shown}
<aside class="schUI relative" transition:fly="{{ x: -300, duration: 300, easing: quadInOut }}">
    <header class="px-8 ">
        <!--<div>
            <h3 class="sch-bold">Board</h3>
        </div>-->

        <br>
        <ul>
            <li>
                <SidebarButton on:click={() => searchOpen = true}>
                    <!--<svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#0D0D0D"></path>
                    </svg>-->
                    <IconSearch size={16}/>
                    <span>Search</span>
                </SidebarButton>
            </li>
            <li>
                <SidebarButton on:click={() => routeStore.set("/editor")} active={$routeStore === "/editor"}>
                    <!--<svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M16.2929 2.29289C16.6834 1.90237 17.3166 1.90237 17.7071 2.29289L21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L8.70711 20.7071C8.51957 20.8946 8.26522 21 8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.7348 3.10536 15.4804 3.29289 15.2929L13.2927 5.2931L16.2929 2.29289ZM14 7.41421L5 16.4142V19H7.58579L16.5858 10L14 7.41421ZM18 8.58579L19.5858 7L17 4.41421L15.4142 6L18 8.58579Z" fill="#0D0D0D"></path>
                    </svg>-->
                    <IconPen size={16}/>
                    <span>Editor</span>
                </SidebarButton>
            </li>
            <li>
                <SidebarButton on:click={() => routeStore.set("/settings")} active={$routeStore === "/settings"}>
                    <!--<svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 4C11.4477 4 11 4.44772 11 5C11 6.69226 8.95399 7.53974 7.75738 6.34314C7.36686 5.95261 6.73369 5.95261 6.34317 6.34314C5.95265 6.73366 5.95265 7.36683 6.34317 7.75735C7.53982 8.954 6.69223 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C6.69236 13 7.53964 15.0461 6.34311 16.2426C5.95258 16.6332 5.95258 17.2663 6.34311 17.6569C6.73363 18.0474 7.36679 18.0474 7.75732 17.6569C8.9539 16.4603 11 17.3077 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 17.3077 15.046 16.4602 16.2427 17.6568C16.6332 18.0474 17.2664 18.0474 17.6569 17.6568C18.0474 17.2663 18.0474 16.6332 17.6569 16.2426C16.4603 15.0461 17.3077 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C17.3078 11 16.4601 8.95405 17.6568 7.75737C18.0473 7.36684 18.0473 6.73368 17.6568 6.34315C17.2663 5.95263 16.6331 5.95263 16.2426 6.34315C15.046 7.53979 13 6.69219 13 5C13 4.44772 12.5523 4 12 4ZM9.00816 4.77703C9.12224 3.2243 10.4181 2 12 2C13.5819 2 14.8778 3.2243 14.9918 4.77703C16.1704 3.75977 17.9525 3.8104 19.071 4.92894C20.1896 6.04748 20.2402 7.82955 19.2229 9.00816C20.7757 9.12221 22 10.4181 22 12C22 13.5819 20.7757 14.8778 19.223 14.9918C20.2403 16.1704 20.1896 17.9525 19.0711 19.0711C17.9525 20.1896 16.1705 20.2402 14.9918 19.2229C14.8778 20.7757 13.5819 22 12 22C10.4181 22 9.12221 20.7757 9.00816 19.2229C7.82955 20.2402 6.04745 20.1896 4.92889 19.0711C3.81034 17.9525 3.75972 16.1704 4.77702 14.9918C3.2243 14.8778 2 13.5819 2 12C2 10.4181 3.22433 9.12221 4.77709 9.00816C3.75978 7.82955 3.81041 6.04747 4.92896 4.92892C6.0475 3.81038 7.82955 3.75975 9.00816 4.77703Z" fill="#0D0D0D"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157Z" fill="#0D0D0D"></path>
                    </svg>-->
                    <IconCog size={16}/>
                    <span>Settings</span>
                </SidebarButton>
            </li>
        </ul>
    </header>
    <div class="px-8 my-0 w-full"><Divider/></div>

    <!-- Favourites -->
    <FavouritesExpandable />
    
    <div class="px-8 my-0 w-full"><Divider/></div>

    <!-- Favourites -->
    <div class="px-8 w-full">
        <SidebarButton on:click={async () => await addNewBoard()} class="mb-2 text-muted">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="var(--muted-color)"></path>
            </svg>
            <span>New Board</span>
        </SidebarButton>

        
        <ul class="w-full">
            {#each $boardsStore as board}
                <FolderBoardButton
                    boardID={board.board.id}
                    title={board.board.title}/>
            {/each}
        </ul>
        

        <!--<FolderTree 
            bind:tree={tree}/>-->

        <SidebarButton on:click={async () => await addNewBoard()} class="mb-2 text-muted">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="var(--muted-color)"></path>
            </svg>
            <span>New Folder</span>
        </SidebarButton>
    </div>


    <!--<div class="h-full">

        <div class="w-max ">
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
    </div>>-->
    <div class="flex-grow flex-shrink"></div>
    <footer class=" px-8">
        <ul>
            <li>
                <SidebarButton on:click={() => IPC.openExternal("https://boardapp.dev/help")} class="text-muted">
                    <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="var(--muted-color)"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 14C11.4477 14 11 13.5523 11 13V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V13C13 13.5523 12.5523 14 12 14Z" fill="var(--muted-color)"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z" fill="var(--muted-color)"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="M12.3899 7.81137C11.4329 7.7658 10.6304 8.3004 10.4864 9.1644C10.3956 9.70917 9.88037 10.0772 9.3356 9.9864C8.79083 9.8956 8.42281 9.38037 8.51361 8.8356C8.86961 6.69961 10.8171 5.73421 12.4851 5.81363C13.3395 5.85432 14.2176 6.16099 14.8937 6.79278C15.5866 7.44027 16 8.36777 16 9.5C16 10.7913 15.4919 11.7489 14.6172 12.3321C13.8141 12.8675 12.8295 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.6705 11 13.1859 10.8825 13.5078 10.668C13.7581 10.5011 14 10.2087 14 9.5C14 8.88224 13.7884 8.49723 13.5282 8.2541C13.2512 7.99526 12.848 7.83318 12.3899 7.81137Z" fill="var(--muted-color)"></path>
                    </svg>
                    <span>Help</span>
                </SidebarButton>
            </li>
            <li>
                <SidebarButton on:click={() => IPC.openExternal("https://boardapp.dev/feedback")} class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span>Feedback</span>
                </SidebarButton>
            </li>
            <li>
                <SidebarButton on:click={() => IPC.openExternal("https://boardapp.dev/premium")} class="text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>Unlock Premium</span>
                </SidebarButton>
            </li>
        </ul>

        <!-- Trash -->
        {#if $sidebarIsDragActiveStore}
        <div class="border-2 rounded-t-lg bg-neutral-300 p-4 px-6 flex flex-col justify-center items-center gap-1 absolute" style="left: 0%;bottom: 0;right: 0; height: 9rem;"
            on:drop|preventDefault={async (e) => {
                let s = e.dataTransfer?.getData("text/boardID")
                if (s) {
                    await deleteBoard(s)
                }
                /*let data
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
                }*/

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
    aside {
        height: 100%;
        min-width: 26ch;
        transition: var(--trans-bg-color);
        @apply w-max py-9 bg-neutral-100 border-r-2 flex flex-col gap-4;
    }
    :global(.app-wrapper.dark) aside {
        @apply bg-neutral-900 border-neutral-700;
    }
</style>