<script>
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
</script>

<nav class="schUI" in:fade="{{ duration: 500, easing: quartInOut}}">
    <slot/>
</nav>

<style>
    nav {
        margin-top: var(--titlebar-height);
        /*isolation: isolate; */
        z-index: 15;
    }
</style>