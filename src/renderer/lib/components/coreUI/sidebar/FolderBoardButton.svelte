<script lang="ts">
    import { isError } from "@common/Errors";
    import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import type { IFolder } from "@common/interfaces/ISettings";
    import IPC from "@renderer/lib/ipc/ipcBridge";
    import { openBoard } from "@renderer/lib/store/activeBoardStore";
    import { boardsStore } from "@renderer/lib/store/boardsStore";
    import { sidebarIsDragActiveStore } from "@renderer/lib/store/sidebarStateStore";
    import { onMount } from "svelte";
import IconFile from "../icons/IconFile.svelte";


    // STATE
    export let  //: IFolder | undefined,
                boardID: string,
                title: string = ""


    async function getTitle(id: string) {
        console.warn(id);
        
        let res = await IPC.getBoard(id)
        // @ts-ignore
        console.warn(res);
        if (isError(res)) {
            return "undefined"
            // TODO: Error popup
        }
        else return (res as ILoadedBoard).board.title
    }

    /*onMount(async () => {
        title = await getTitle(boardId)
    })*/
</script>

<li class="w-full" 
    draggable="true"
    on:dragstart={(e) => {
        
        if (e.dataTransfer) e.dataTransfer.setData("text/boardID", boardID);
        //if (e.dataTransfer) e.dataTransfer.setData("collectionObject", JSON.stringify({ type: "board", data: boardId }));
        sidebarIsDragActiveStore.set(true)
    }}
    on:dragend={() => {
        //if (collection) collection.boards = collection.boards.filter(e => e !== boardId)
        sidebarIsDragActiveStore.set(false)
    }}
    >
    <button on:click|preventDefault={() => openBoard(boardID)} class="w-full px-3 py-1 flex gap-2 justify-start items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 active:ml-0.5 rounded-md transition-all">
        <IconFile size={16}/>
        <span class="sch-regular">
            {#key $boardsStore}
            {#if title === ""}
                {#await getTitle(boardID) then title}{title}{/await}
            {:else}
                {title}
            {/if}
            {/key}
        </span>
    </button>
    <!--<div class="flex gap-3 items-center">
        <svg class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <button class="text-base sch-medium text-neutral-600" on:click|preventDefault={() => openBoard(boardId)}>
            {#key $boardsStore}
            {#if title === ""}
            {#await getTitle(boardId) then title}{title}{/await}
            {:else}
            {title}
            {/if}
            {/key}
        </button>
    </div>-->
</li>