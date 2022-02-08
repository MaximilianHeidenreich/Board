<script>
    import { router } from "tinro";

    import Button from "../components/coreUI/buttons/Button.svelte";
    
</script>
<div class="content">
    <div class="flex gap-5 justify-around items-center">
        <Button on:click={() => router.goto("/")}>Exit</Button>
        <Button on:click={() => router.goto("/dev/icons")}>Icons</Button>
        <Button>Popover</Button>
        <Button>Buttons</Button>
    </div>
</div>

<style lang="postcss">
    .content {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: var(--content-height);
        @apply p-12 flex justify-center items-center;
    }
</style>