<script lang="ts">
    import ThemedElement from "../ThemedElement.svelte";

    // STATE
    export let  size: 32 | 24 | 20 | 16 = 32,
                inverted = false
</script>

<ThemedElement>
    <slot slot="dark" name="dark" />
    <slot slot="light" name="light" />
</ThemedElement>