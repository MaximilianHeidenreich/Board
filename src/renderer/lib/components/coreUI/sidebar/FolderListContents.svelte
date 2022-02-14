<script lang="ts">
    import type { IFolder } from "@common/interfaces/ISettings";
    import Popover from "../../Popover.svelte";
import FolderBoardButton from "./FolderBoardButton.svelte";
import FolderList from "./FolderTree.svelte";
import SidebarButton from "./SidebarButton.svelte";

    // STATE
    export let  folder: IFolder,
                inner = false,
                showDropzone = false
    
</script>

<li>
    <!--{#each folder.boards as boardID}
    <FolderBoardButton
        {boardID}/>
    <SidebarButton>
        <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path xmlns="http://www.w3.org/2000/svg" d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4Z" fill="#0D0D0D"></path>
        </svg>
        <span>Board 1</span>
    </SidebarButton>
    {/each}-->

    <!--<FolderList 
        folders={folder.subFolders}/>-->
</li>


<div class="mt-1 flex gap-8 justify-between items-center" 
    draggable="true" 
    
    on:drop|preventDefault={(e) => {
        /*let s = e.dataTransfer?.getData("collectionObject")
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
            if (data.data) collection.boards.push(data.data)
        
        }
        else if (data.type === "collection") {
            console.warn(data.data);

            if (data.data) collection.subCollections.push(data.data)
            
            
        }

        e.dataTransfer?.clearData()
        showDropzone = false*/
    }} 
    on:dragover|preventDefault={() => {
        showDropzone = true
    }}
    on:dragleave|preventDefault={() => {
        showDropzone = false
    }}
    on:dragstart={(e) => {
        
        //if (e.dataTransfer) e.dataTransfer.setData("text/plain", boardId);
        if (e.dataTransfer) e.dataTransfer.setData("collectionObject", JSON.stringify({ type: "collection", data: folder }));
    }}
    on:dragend={() => {
        showDropzone = false
    }}>

    <div class="flex gap-3 items-center">
        {#if inner}
        <svg class="feather feather-folder text-neutral-300 mb-1 -ml-7" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
        </svg>
        {/if}
        <Popover pos="right">
            <svg slot="content" class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <div slot="pop">
                <span class="text-base sch-medium text-neutral-800">Collections name:</span>
                <input type="text" bind:value={folder.name} placeholder="Collection name" class="mt-2 sch-medium py-2 px-3 w-full border-2 rounded-xl focus:outline-none focus:border-neutral-300 bg-white text-sm">
            </div>
        </Popover>
        <button class="text-base sch-medium text-neutral-600"
            on:click|preventDefault={() => folder.expanded = !folder.expanded}
            >{folder.name}</button>
    </div>
    <!--{#if collection.boards.length > 0 || collection.subCollections.length > 0}
    <svg class="feather feather-folder text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        {#if collection.expanded}
        <polyline points="6 9 12 15 18 9"></polyline>
        {:else}
        <polyline points="18 15 12 9 6 15"></polyline>
        {/if}
    </svg>
    {/if}-->
</div>

{#if showDropzone}
<li>
    <div class="flex gap-3 items-center">
        <svg class="feather feather-folder text-neutral-300 mb-1 -ml-7" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
        </svg>
        <svg class="feather feather-folder text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
        <span class="text-base sch-medium text-neutral-600">Insert here</span>
    </div>
</li>
{/if}

<!--{#if collection.expanded}
<CollectionListItem
    bind:collection/>
{/if}-->