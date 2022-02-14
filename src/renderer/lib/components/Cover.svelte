<script lang="ts">

    // STATE
    export let  open = false,
                padded = true

</script>

{#if open}
<div class="cover" class:padded>
    <div class="content relative">
        <button class="closeBtn" on:click|preventDefault={() => open = false}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <slot/>
    </div>
</div>
{/if}

<style lang="postcss">
    .cover {
        z-index: 500;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        @apply pt-12 bg-white;
    }
    .cover.padded {
        @apply p-12;
    }
    .cover .closeBtn {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>