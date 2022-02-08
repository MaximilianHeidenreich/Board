<script lang="ts">
    import ThemedElement from "../ThemedElement.svelte";
</script>

<ThemedElement>
    <slot slot="dark" name="dark" />
    <slot slot="light" name="light" />
</ThemedElement>