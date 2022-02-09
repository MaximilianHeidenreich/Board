<script lang="ts">
    import { quintOut } from "svelte/easing";

    import { fade } from "svelte/transition";
    import { fly } from "svelte/transition";

    import Tooltip from "../Tooltip.svelte";
    import IconClose from "./icons/IconClose.svelte";


    // STATE
    export let position: "pos-none" | "pos-t" | "pos-l" | "pos-b" | "pos-r" = "pos-none"
    export let minWidth = "40ch"
    export let opened = false
</script>

{#if opened}
<div class="panel-wrapper">
    <div class="bg" in:fade out:fade on:click|stopPropagation={() => opened = false}></div>
    <div class="panel {position}" style="--s_min-width: {minWidth}" transition:fly="{{ x: -300, duration: 300, easing: quintOut }}">
        <div class="header flex justify-between items-center">
            <slot name="title" />
            <Tooltip>
                <button slot="content" class="ml-8" on:click={() => opened = false }>
                    <IconClose/>
                </button>
                <p slot="tooltip">Close</p>
            </Tooltip>
        </div>
        <div class="content">
            <slot/>
        </div>
    </div>
</div>
{/if}

<style lang="postcss">
    .panel-wrapper {
        position: absolute;
        isolation: isolate;
        z-index: 40;
    }
    .bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        @apply bg-neutral-100 opacity-30;
    }
    .panel {
        position: fixed;
        min-width: var(--s_min-width);
        @apply p-10 m-12 mt-16;
        @apply bg-white rounded-lg border-4 border-neutral-100 shadow-2xl;
    }

    .content {
        height: 100%;
        @apply py-8 overflow-y-auto;
    }

    /* POSITIONS */
    .panel.pos-none {
        position: relative;
    }
    .panel.pos-l {
        top: 0;
        left: 0;
        bottom: 0;
        width: auto;
    }
</style>