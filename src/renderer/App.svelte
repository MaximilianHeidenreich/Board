<script lang="ts">
    import { get } from "svelte/store";
    import {  onMount } from "svelte";

    import Dropzone from "./lib/components/coreUI/board/Dropzone.svelte";
    import BoardSwitcher from "./lib/components/coreUI/boardSwitcher/BoardSwitcher.svelte";
    import { router, Route } from "tinro";
    import Dev from "./lib/pages/Dev.svelte";
    import DevIcons from "./lib/pages/dev/DevIcons.svelte";    

    // STORES ! Loading order is important
    import { activeBoardStore, activeBoardIDStore, openBoard } from "./lib/store/activeBoardStore";
    import { bufferBusy } from "./lib/store/bufferBusy";
    import { settingsStore } from "./lib/store/settingsStore";
    import { addNewBoard, boardsStore } from "./lib/store/boardsStore";
    import { isError } from "@common/Errors";
    import { themeStore } from "./lib/store/themeStore";
    import IPC from "./lib/ipc/ipcBridge";
    import Sidebar from "./lib/components/coreUI/sidebar/Sidebar.svelte";
    import Editor from "./lib/pages/Editor.svelte";
import { routeStore } from "./lib/store/routeStore";
import Settings from "./lib/pages/Settings.svelte";
 
    // Loat last opened board / create new if none exist
    onMount(async () => {
        
        await settingsStore.initialized
        await boardsStore.initialized
        // > 0 boards -> Load last opened or latest if not found
        let bs = get(boardsStore)
        
        let s = get(settingsStore)
        if (bs?.length > 0) {
            //let lastBoard = d.boards.find(e => e.id === )
            //lastBoard = lastBoard || d.boards[0] // TODO: handle deleted last board &  get latest by timestamp
            openBoard(s.openBoardId || bs[0].board.id)
        }
        // <= 0 board -> Create new and load
        else {
            let res = await addNewBoard()
            if (isError(res)) return res
            let id = res as string
            bs = get(boardsStore)  // TODO: ???
            await openBoard(id)
        }

        //setTimeout(async () => await activeBoard.load(), 1000)

        await activeBoardStore.initialized
        console.log("SettingsStore:");
        console.log(get(settingsStore));
        console.log("BoardsStore:");
        console.log(get(boardsStore));
        console.log("ActiveBoardStore:");
        console.log(get(activeBoardStore));
        
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

        return
    })
</script>

<!--
    --textBase: {theme.colors.textBase}; 
                        --textBaseDark: {theme.colors.textBaseDark}; 
                        --textLight: {theme.colors.textLight}; 
                        --textLightDark: {theme.colors.textLightDark};
                        --textMuted: {theme.colors.textMuted};
                        --textMutedDark: {theme.colors.textMutedDark}
-->
<div id="root" class="h-full">
    <div id="titlebar" class="schUI px-3 flex justify-end items-center gap-3">
        <p class="muted"><small>Debug:</small></p>
        <p class="muted"><small>v{#await IPC.getVersion() then version}{version}{/await}</small></p>
        <p class="muted"><small>Active Board ID: {$activeBoardIDStore}</small></p>
        <p class="muted"><small><b>{#if $bufferBusy}<span class="text-rose-400">BUSY</span>{:else}<span class="text-lime-400">IDLE</span>{/if}</b></small></p>
    </div>
    <!--<Dropzone/>-->
    <div class="app-wrapper" class:dark={$themeStore.darkMode}>
        <!--<div class="bg-red-300 flex-grow-0 flex-shrink-0" style="min-height: var(--titlebar-height);">titlebar</div>-->
        <!--<Router
            {routes}
            on:conditionsFailed={conditionsFailed}
            restoreScrollState={false}
        />-->
        <!--<BoardSwitcher/>-->

        {#if $settingsStore && $boardsStore}
        <Sidebar
            bind:settings={$settingsStore}
            bind:shown={$settingsStore.sidebarShown}/>
        {/if}

        <main>
            {#if $routeStore === "/"}
                index
            {:else if $routeStore === "/editor"}
                {#if $activeBoardStore}
                    <!--{#key activeBoardIDStore}-->
                    <Editor
                        bind:board={$activeBoardStore}
                        />
                {:else}
                    <div class="loader-wrapper flex justify-center items-center">
                        <div class="flex flex-col items-center gap-5">
                            <div class="loader"></div>
                            <p>Loading...</p>
                        </div>
                    </div>
                {/if}
            {:else if $routeStore === "/settings"}
                <Settings />
            {/if}
        </main>
    </div>
</div>

<style lang="postcss">









    :global(.muted) {
        color: var(--textMuted)
    }
    .app-wrapper {
        @apply w-full h-full overflow-hidden flex;
        --trans-bg-color: background-color .3s 0s ease-in-out,
                    color .3s 0s ease-in-out;
        transition: var(--trans-bg-color);
    }
    main {
        @apply w-full h-full py-12 px-8 overflow-hidden;
    }
    .app-wrapper.dark {
        @apply bg-black text-white;
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