<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";
    import { get } from "svelte/store";
    import { onDestroy, onMount } from "svelte";

    import Dropzone from "./lib/components/coreUI/board/Dropzone.svelte";
    import { addNewBoard, importLocalAssets, openBoard, openBoardRaw } from "./lib/boardUtils";
    import Board from "./lib/pages/Board.svelte";
    import BoardSwitcher from "./lib/components/coreUI/boardSwitcher/BoardSwitcher.svelte";
    import { Route } from "tinro";
    import Dev from "./lib/pages/Dev.svelte";
    import DevIcons from "./lib/pages/dev/DevIcons.svelte";    
    import theme from "./lib/theme";

    // STORES ! Loading order is important
    import { darkMode } from "./lib/store/darkModeStore";
    import { data } from "./lib/store/dataStore";
    import { settings } from "./lib/store/settingsStore";
    import { boards } from "./lib/store/boardsStore";
    import { activeBoard, activeBoardId } from "./lib/store/activeBoardStore";
import { bufferBusy } from "./lib/store/bufferBusy";
import { getVersion } from "./lib/ipcBridge";


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
        
        await settings.initialized
        await boards.initialized
        // > 0 boards -> Load last opened or latest if not found
        let bs = get(boards)
        let s = get(settings)
        if (bs?.length > 0) {
            //let lastBoard = d.boards.find(e => e.id === )
            //lastBoard = lastBoard || d.boards[0] // TODO: handle deleted last board &  get latest by timestamp
            openBoard(s.openBoardId || bs[0].board.id)
        }
        // <= 0 board -> Create new and load
        else {
            let id = await addNewBoard()
            bs = get(boards)  // TODO: ???
            await openBoard(id)
        }

        //setTimeout(async () => await activeBoard.load(), 1000)

        console.log("Settings:");
        console.log(get(settings));
        console.log("Data:");
        console.log(get(data));
        console.log("Boards:");
        console.log(get(boards));
        console.log("Active Board:");
        console.log(get(activeBoard));
        
        /*setTimeout(async () => {
            let id = await addNewBoard()
            openBoard(id)
        }, 1000)**/
        /*setTimeout(async () => {

            console.log("Settings:");
            console.log(await get(settings));
            console.log("Data:");
            console.log(await get(data));
            console.log("Boards:");
            console.log(await get(boards));
            
        }, 900)*/ // TODO!: Replace with subscrbe to data store
    })

    activeBoardId.subscribe((v) => {
        activeBoard.set(boards.getById(v))
    })

</script>

<div id="root" style="--textBase: {theme.colors.textBase}; 
                        --textBaseDark: {theme.colors.textBaseDark}; 
                        --textLight: {theme.colors.textLight}; 
                        --textLightDark: {theme.colors.textLightDark};
                        --textMuted: {theme.colors.textMuted};
                        --textMutedDark: {theme.colors.textMutedDark}">
    <div id="titlebar" class="flex justify-end gap-3">
        <p class="muted mx-2"><small>v{#await getVersion() then version}{version}{/await}</small></p>
        <p class="muted mx-2"><small>Active Board ID: {$activeBoardId}</small></p>
        <p class="muted mx-2"><small>BufferBusy: {#if $bufferBusy}<span class="text-rose-500">BUSY</span>{:else}<span class="text-lime-500">CLEAR</span>{/if}</small></p>
    </div>
    <!--<Dropzone/>-->
    <div class="app-wrapper" class:dark={$darkMode}>
        <!--<div class="bg-red-300 flex-grow-0 flex-shrink-0" style="min-height: var(--titlebar-height);">titlebar</div>-->
        <!--<Router
            {routes}
            on:conditionsFailed={conditionsFailed}
            restoreScrollState={false}
        />-->
        {#if $activeBoard}
                {#key $activeBoardId}
                    <Board
                        board={$activeBoard.board}
                        />
                {/key}
                <BoardSwitcher/>
            {:else}
            <div class="loader-wrapper flex justify-center items-center">
                <div class="flex flex-col items-center gap-5">
                    <div class="loader"></div>
                    <p>Loading...</p>
                </div>
            </div>
            {/if}
        <Route path="/">
            
        </Route>
        <Route path="/dev">
            <Dev/>
        </Route>
        <Route path="/dev/icons">
            <DevIcons/>
        </Route>
    </div>
</div>

<style lang="postcss">
    :global(.muted) {
        color: var(--textMuted)
    }
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