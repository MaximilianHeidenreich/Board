<script>
    import { darkMode } from "@renderer/lib/store/darkModeStore";
</script>

{#if $darkMode}
<slot name="dark" />
{:else}
<slot name="light" />
{/if}