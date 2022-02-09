<script>
    import { router } from "tinro";

    import Button from "@renderer/lib/components/coreUI/buttons/Button.svelte";
    import IconPlus from "@renderer/lib/components/coreUI/icons/IconPlus.svelte";
    import IconShare from "@renderer/lib/components/coreUI/icons/IconShare.svelte";
    import IconLink from "@renderer/lib/components/coreUI/icons/IconLink.svelte";
    import IconMoon from "@renderer/lib/components/coreUI/icons/IconMoon.svelte";
    import IconSun from "@renderer/lib/components/coreUI/icons/IconSun.svelte";
    import IconMore from "@renderer/lib/components/coreUI/icons/IconMore.svelte";
    import IconFilter from "@renderer/lib/components/coreUI/icons/IconFilter.svelte";
import { themeStore } from "@renderer/lib/store/themeStore";

</script>
<div class="dev-content">
    <div>
        <Button on:click={() => router.goto("/dev")}>Back</Button>
        <Button on:click={() => {$themeStore.darkMode = !$themeStore.darkMode}}>Toggle theme</Button>
        <br>
        <br>
        <div id="devIconPreview">
            <IconPlus/>
            <IconShare/>
            <IconFilter/>
            <IconMore/>
            <IconLink/>
            <IconMoon/>
            <IconSun/>
        </div>
    </div>
</div>

<style lang="postcss">
    .dev-content {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: var(--content-height);
        @apply p-12 px-40 flex justify-center;
    }
    :global(#devIconPreview > *) {
        display: inline-block;
        @apply m-4;
    }
</style>