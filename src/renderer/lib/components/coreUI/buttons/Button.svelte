<script lang="ts">
    import { themeStore } from "@renderer/lib/store/themeStore";
    import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<button class="schUI" class:dark={$themeStore.darkMode} {...$$restProps} on:click={() => dispatch("click")}>
    <slot/>
</button>

<style lang="postcss">
    button {
        @apply px-5 py-2.5 text-white font-semibold text-center text-sm rounded-lg border-2 bg-neutral-900 border-neutral-700;
    }
    button:hover {
        @apply bg-neutral-700;
    }
    :global(.app-wrapper.dark) button {
        @apply bg-neutral-50 border-neutral-200 text-black;
    }
    button.dark:hover {
        @apply bg-neutral-200;
    }
</style>