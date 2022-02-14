<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let  disabled = false,
                active = false

    // API
    const dispatch = createEventDispatcher()
</script>

<button 
    on:click|preventDefault={() => dispatch("click")} 
    class:disabled
    class:active
    {...$$restProps}
    >
    <slot/>
</button>

<style lang="postcss">
    button {
        @apply w-full my-0.5 px-3 py-1 flex gap-2 justify-start items-center rounded-md transition-all;
    }
    button:hover {
        @apply bg-neutral-200;
    }
    :global(.app-wrapper.dark) button:hover {
         @apply bg-neutral-800;
    }
    button:active {
        @apply ml-0.5;
    }
    button.active {
        @apply cursor-default bg-neutral-200;
    }
    :global(.app-wrapper.dark) button.active {
        @apply bg-neutral-700;
    }
</style>