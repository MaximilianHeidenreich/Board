<script>
    import { themeStore } from "@renderer/lib/store/themeStore";
</script>

{#if $themeStore.darkMode}
    <slot name="dark" />
    <slot />
{:else}
    <slot name="light" />
{/if}