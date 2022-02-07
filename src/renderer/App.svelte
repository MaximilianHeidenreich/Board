<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";
    import { get } from "svelte/store";
    import { onDestroy, onMount } from "svelte";

    import { darkMode } from "./lib/store/darkModeStore";
    import { data } from "./lib/store/dataStore";
    import { settings } from "./lib/store/settingsStore";

    import Dropzone from "./lib/components/coreUI/board/Dropzone.svelte";
    import { getFilesDialog, getVersion } from "@renderer/lib/ipcBridge";
    import { addNewBoard, importLocalAssets, openBoard, openBoardRaw } from "./lib/boardUtils";
    import Board from "./lib/pages/Board.svelte";
    import BoardSwitcher from "./lib/components/coreUI/boardSwitcher/BoardSwitcher.svelte";
import { activeBoard, activeBoardId } from "./lib/store/activeBoardStore";


    // State
    let errors: string[] = []  // TODO: Display as popups
    //let activeBoard: IBoard

    /*onDestroy(
        activeBoardId.subscribe(async (id) => {
            let d = (await get(data)).boards.find(b => b.id === id)
            if (d) activeBoard = d
        })
    )*/

    // BOARD API
    

    // Loat last opened board / create new if none exist
    onMount(async () => {
        
        
        /*setTimeout(async () => {
            let id = await addNewBoard()
            openBoard(id)
        }, 1000)**/
        setTimeout(async () => {
            // > 0 boards -> Load last opened or latest if not found
            let d = await get(data)
            let s = await get(settings)
            if (d.boards.length > 0) {
                let lastBoard = d.boards.find(e => e.id === s.openBoard)
                lastBoard = lastBoard || d.boards[0] // TODO: get latest by timestamp
                openBoardRaw(lastBoard, true)
            }
            // <= 0 board -> Create new and load
            else {
                let id = await addNewBoard()
                d = await get(data)
                await openBoard(id)
            }
        }, 500) // TODO!: Replace with subscrbe to data store
    })

    let src = "";
    async function lDimg() {
        let res = (await getFilesDialog());
        console.log(res.filePaths);
        
        src = res.filePaths[0]
    }
    
    
</script>

<div id="titlebar" class="flex justify-end gap-5 text-right">
    {JSON.stringify($activeBoardId)}
</div>
<Dropzone/>
<div class="app-wrapper" class:dark={$darkMode}>
    <!--<div class="bg-red-300 flex-grow-0 flex-shrink-0" style="min-height: var(--titlebar-height);">titlebar</div>-->
    <!--<Router
        {routes}
        on:conditionsFailed={conditionsFailed}
        restoreScrollState={false}
    />-->
    {#if $activeBoard}
        {#key $activeBoard}
        <Board
            board={$activeBoard}/>
        {/key}
        <div class="mt-72">
            <button on:click={() => importLocalAssets($activeBoardId)}>new</button>
        </div>
        <BoardSwitcher/>
    {:else}
    <div class="loader-wrapper flex justify-center items-center">
        <div class="flex flex-col items-center gap-5">
            <div class="loader"></div>
            <p>Loading...</p>
        </div>
    </div>
    {/if}
</div>

<style lang="postcss">
    .app-wrapper {
        width: 100%;
        max-height: 100vh;
        /*display: grid;
        grid-template-columns: auto;
        grid-template-rows: var(--titlebar-height) auto 1fr; /* calc(1fr - var(--titlebar-height)) */
        display: flex;
        flex-direction: column;
        transition: background-color .3s 0s ease-in-out,
                    color .3s 0s ease-in-out;
    }
    .app-wrapper.dark {
        @apply bg-black text-white ;
    }
    .loader-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .loader {
        width: 40px;
        height: 40px;
        border: 5px solid #323232;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        animation: pulse 1s linear infinite;
    }
    .loader:after {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        border: 5px solid #323232;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: scaleUp 1s linear infinite;
    }

    @keyframes scaleUp {
        0% { transform: translate(-50%, -50%) scale(0) }
        60% , 100% { transform: translate(-50%, -50%)  scale(1)}
    }
    @keyframes pulse {
        0% , 60% , 100%{ transform:  scale(1) }
        80% { transform:  scale(1.2)}
    }
</style>