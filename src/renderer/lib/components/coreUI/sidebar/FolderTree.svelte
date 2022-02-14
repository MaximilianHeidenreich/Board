<script lang="ts">
import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import type { IFolder } from "@common/interfaces/ISettings";
import FolderBoardButton from "./FolderBoardButton.svelte";
    import FolderListContents from "./FolderListContents.svelte";
import SidebarButton from "./SidebarButton.svelte";

    // STATE
    export let  //boards: ILoadedBoard[],
                //path: string,
                tree: any,
                isFolder = false
    
    /*type d = { path: string, type: "board" | "folder", data: ILoadedBoard | IFolder }
    let folderStructure: { type: "board" | "folder", data: ILoadedBoard | IFolder }[] = []

    let innerBoards: ILoadedBoard[] = []
    let innerFolders: { path: string, boards: ILoadedBoard[] }[] = []

    boards.forEach(e => {
        if (e.userOverrides.sidebarFolderPath === path) innerBoards.push(e)
        else {
            let i = innerFolders.findIndex(f => f.path === e.userOverrides.sidebarFolderPath)
            if (i !== -1) {
                innerFolders[i].boards.push(e)
            }
            else {
                innerFolders.push({ path: `${path}#${e.userOverrides.sidebarFolderPath.split("#")[treeDepth]}`, boards: [e] })
            }
        }
    })
    console.log(innerBoards);
    console.log(innerFolders);*/
    
    

</script>

<!-- Collections -->
<ul class="w-max {isFolder ? 'ml-6' : ''}">
    {#if isFolder}
    <SidebarButton>
        <svg class="feather feather-folder text-neutral-300" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
        </svg>
        <span>{tree.name}</span>
    </SidebarButton>
    {/if}
    {#each tree.childBoards as boardID}
    <FolderBoardButton 
        bind:boardID/>
    {/each}

    {#each tree.childFolders as folder}
    <svelte:self tree={folder} isFolder={true}/>
    {/each}
    <!--{#each boards as board}
        <FolderListContents 
            inner={inner}
            bind:folder/>
    {/each}-->
</ul>

<style lang="postcss">

</style>