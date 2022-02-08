<script>
    import { darkMode } from "@store/darkModeStore";
    import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<button class:dark={$darkMode} on:click={() => dispatch("click")}>
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
    button.dark {

    }
</style>