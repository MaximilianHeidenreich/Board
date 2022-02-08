<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
    import { darkMode } from "@store/darkModeStore";

    export let padding = true
    export let position: "t" | "tl" | "tr" | "rt" | "r" | "rb" | "b" | "bl" | "br" | "l" | "lt" | "lb" = "b"

    // STATE
    export let opened = false;


    // API
    const dispatch = createEventDispatcher()
    function open() {
        opened = true
        dispatch("changeState", { opened })
    }
    function close() {
        opened = false
        dispatch("changeState", { opened })
    }
</script>

<div class="z-50">
    {#if opened}
    <div class="popover-background" on:click|preventDefault={close} in:fade={{ duration: 200, easing: quartInOut}} out:fade={{ duration: 200, easing: quartInOut}}></div>
    {/if}
    <div class="popover-wrapper relative" class:dark={$darkMode} on:click={open}>
        <slot name="content"/>
        {#if opened}
        <div id="popover" class:padding={padding} class="{position}"  in:fade={{ duration: 200, easing: quartInOut}} out:fade={{ duration: 200, easing: quartInOut}}>
            <slot name="popover"/>
        </div>
        {/if}
    </div>
</div>

<style lang="postcss">
    .popover-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        @apply bg-slate-50 opacity-40;
    }
    .popover-wrapper {
        z-index: 100;
        isolation: isolate;
    }
    .popover-wrapper.dark #popover {
        @apply bg-neutral-800 text-white;
    }
    .popover-wrapper.dark #popover::after {
        border-bottom: 7px solid rgba(0,0,0, 1);
    }

    #popover {
        @apply inline-block absolute;
        @apply text-sm font-medium text-black bg-neutral-50 rounded-lg shadow-lg border-2 border-neutral-100;
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: 40ch;
    }
    #popover.padding {
        @apply py-2 px-3;
    }
    #popover::after {
        position: absolute;
        left: 50%;
        top: -7px;
        transform: translateX(-50%);
        content: "";
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 7px solid rgba(255,255,255, 1);
        @apply border-b-neutral-100;
        
    }

    /* POSITIONS */
    /* "t" | "tl" | "tr" | "rt" | "r" | "rb" | "b" | "bl" | "br" | "l" | "lt" | "lb" = "b" */
    #popover.t {
        left: 50%;
        bottom: 2.4rem;
        transform: translateX(-50%);
    }
    #popover.t::after {
        
    }
    #popover.tl {
        left: 10%;
        bottom: 2.4rem;
        transform: translateX(-10%);
    }
    #popover.tl::after {}
    #popover.tr {
        left: 90%;
        bottom: 2.4rem;
        transform: translateX(-90%);
    }
    #popover.tr::after {}
    #popover.r {
        right: 0;
        top: 50%;
        transform: translate(2rem, -50%);
    }
    #popover.r::after {}
    #popover.rt {
        top: -10%;
        transform: translate(2rem, -10%);
    }
    #popover.rt::after {}
    
    #popover.rb {
        bottom: -10%;
        transform: translate(2rem, 10%);
    }
    #popover.rb::after {}
    #popover.b {
        left: 50%;
        top: 2.4rem;
        transform: translateX(-50%);
    }
    #popover.b::after {
        left: 50%;
        top: -7px;
        transform: translateX(-50%);
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
    }
    #popover.bl {
        left: 10%;
        top: 2.4rem;
        transform: translateX(-10%);
    }
    #popover.bl::after {
        left: 10%;
        top: -7px;
        transform: translateX(-10%);
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
    }
    #popover.br {
        left: 90%;
        top: 2.4rem;
        transform: translateX(-90%);
    }
    #popover.br::after {
        left: 90%;
        top: -7px;
        transform: translateX(-90%);
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
    }
    #popover.l {
        left: -100%;
        top: 50%;
        transform: translate(-100%, -50%);
    }
    #popover.l::after {} /* TODO: FIX */
    #popover.lt {
        left: -100%;
        top: 10%;
        transform: translate(-100%, -10%);
    }
    #popover.lt::after {}
    #popover.lb {
        left: -100%;
        top: 90%;
        transform: translate(-100%, -90%);
    }
    #popover.lb::after {}
</style>