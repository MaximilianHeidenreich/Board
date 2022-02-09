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
        @apply px-5 py-2.5 text-white font-semibold text-center text-sm rounded-lg bg-gray-800;
    }
    button:hover {
        @apply bg-gray-900;
    }
    button.dark {
        @apply bg-gray-800 border-gray-700;
    }
    button.dark:hover {
        @apply bg-gray-700;
    }
</style>