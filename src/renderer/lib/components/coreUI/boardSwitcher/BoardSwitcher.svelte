<script lang="ts">
    import { quartInOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    import { switcherOpened } from "@renderer/lib/store/switcherOpenedStore";
    import BoardsGallery from "./BoardsGallery.svelte";
    import { onMount } from "svelte";
    import { boardsStore } from "@renderer/lib/store/boardsStore";

    // INIT
    onMount(() => {
        boardsStore.load()
    })

</script>

{#if $switcherOpened}
<div id="switcher-wrapper" class="z-50" in:fade={{ duration: 200, easing: quartInOut}} out:fade={{ duration: 200, easing: quartInOut}}>
    <div id="switcher-background" on:click={() => switcherOpened.set(false)}></div>
    <div id="switcher" class="flex flex-col">
        <div>
            <h2 class="sch-bold">Switch Boards</h2>
            <div>
                <p><small>TODO ?Sort & Search</small></p>
            </div>
        </div>
        <div class="h-full">
            {#key $boardsStore}
            <BoardsGallery
                boards={$boardsStore}
                />
            {/key}
        </div>
    </div>
</div>
{/if}

<style lang="postcss">
     #switcher-wrapper {
        position: fixed;
        isolation: isolate;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    #switcher-background {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        @apply bg-slate-50 opacity-40;
    }
    #switcher {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 500px;
        /*min-height: 30ch;
        max-height: 45ch;*/
        @apply bg-white border-2 p-12;
    }
</style>