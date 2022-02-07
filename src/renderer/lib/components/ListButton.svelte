<script>
    import { darkMode } from "../store/darkModeStore";

</script>

<button class:dark={$darkMode}>
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