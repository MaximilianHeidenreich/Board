<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let  min: number = 0,
                max: number = 3,
                value: number = 2;
</script>

<input type="range" min={min} max={max} bind:value={value} class="slider" on:change={() => dispatch("change", { value })}>

<style lang="postcss">  
    :global(input[type="range"]) {
        @apply appearance-none w-full h-2 bg-white rounded-full outline-none border-2 border-slate-200;
    }
    :global(input[type="range"]::-webkit-slider-thumb) {
        @apply appearance-none rounded-full bg-slate-900 cursor-pointer;
        width: 1.2rem;
        height: 1.2rem;
    }
    :global(input[type="range"]::-webkit-slider-thumb:hover) {
        @apply bg-slate-700;
    }

    :global(.app-wrapper.dark input[type="range"]) {
        @apply bg-black border-slate-100;
    }
    :global(.app-wrapper.dark input[type="range"]::-webkit-slider-thumb) {
        @apply bg-white;
    }
    :global(.app-wrapper.dark input[type="range"]::-webkit-slider-thumb:hover) {
        @apply bg-slate-100;
    }
</style>