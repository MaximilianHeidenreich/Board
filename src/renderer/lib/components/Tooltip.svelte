<script lang="ts">
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
    import { darkMode } from "../store/darkModeStore";

    export let padding = true

    let visible = false;
    function mouseEnter() {
        visible = true;
    }
    function mouseExit() {
        visible = false;
    }
</script>

<div class="tooltip-wrapper relative" class:dark={$darkMode} on:mouseenter={mouseEnter} on:mouseleave={mouseExit}>
    <slot name="content"/>
    {#if visible}
    <div id="tooltip" class:padding={padding} in:fade={{ delay: 800, duration: 200, easing: quartInOut}} out:fade={{ delay: 100, duration: 200, easing: quartInOut}}>
        <slot name="tooltip"/>
    </div>
    {/if}
</div>

<style lang="postcss">
    .tooltip-wrapper {
        /* isolation: isolate; */
    }
    #tooltip {
        @apply inline-block absolute;
        @apply text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm;
        left: 50%;
        top: 2.4rem;
        transform: translateX(-50%);
        width: max-content;
        max-width: 40ch;
    }
    #tooltip.padding {
        @apply py-2 px-3;
    }
    #tooltip::after {
        position: absolute;
        left: 50%;
        top: -7px;
        transform: translateX(-50%);
        content: "";
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 7px solid rgba(0,0,0, 1);
    }

    .tooltip-wrapper.dark #tooltip {
        @apply bg-white text-black;
    }
    .tooltip-wrapper.dark #tooltip::after {
        border-bottom: 7px solid rgba(255,255,255, 1);
    }
</style>