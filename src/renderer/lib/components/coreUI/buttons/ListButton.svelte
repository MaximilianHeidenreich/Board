<script>
    import { themeStore } from "@renderer/lib/store/themeStore";
    import { createEventDispatcher } from "svelte";
 
    // STATE
    export let disabled = false

	const dispatch = createEventDispatcher();
</script>

<button 
    disabled={disabled}
    class:disabled
    class:dark={$themeStore.darkMode} on:click={() => dispatch("click")}>
    <slot/>
</button>

<style lang="postcss">
    button {
        width: 100%;
        border-collapse: collapse;
        @apply bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-100 shadow;
        @apply inline-flex items-center;
    }
    button:hover {
        @apply bg-gray-100;
    }
    button.disabled {
        @apply bg-neutral-100 opacity-60 cursor-not-allowed;
    }
</style>