<script lang="ts">
    import { createEventDispatcher } from "svelte";


    const dispatch = createEventDispatcher()
</script>

<div class="zone" on:dragover|preventDefault={() => {}} on:drop={() => dispatch("dropped")}>
    <p class="muted"><small>Drop here</small></p>
</div>

<style lang="postcss">
    .zone {
        @apply flex-shrink-0 w-20 h-full flex justify-center items-center bg-neutral-100 rounded-lg border-2 border-dashed;
    }
</style>