<script lang="ts">
    import { createEventDispatcher } from "svelte";


    const dispatch = createEventDispatcher()
</script>

<div class="modal">
    <div class="background"></div>
    <div class="content">
        <slot/>
    </div>
</div>

<style lang="postcss">
    .modal {
        isolation: isolate;
    }
    .background {
        @apply bg-slate-50 opacity-25;
    }
</style>