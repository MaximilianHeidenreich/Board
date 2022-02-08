<script>
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
</script>

<main in:fade="{{ duration: 500, easing: quartInOut}}">
    <slot></slot>
</main>

<style>
    main {
        /*isolation: isolate;*/
        z-index: 15;
        /*min-height: var(--content-height);
        max-height: var(--content-height);*/
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: var(--content-height);
        overflow: hidden;
    }
</style>