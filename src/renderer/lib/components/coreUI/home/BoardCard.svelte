<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";
    import { activeBoardId } from "@renderer/lib/store/activeBoardStore";
    import ThemedElement from "../ThemedElement.svelte";
    import { switcherOpened } from '@renderer/lib/store/switcherOpenedStore';


    export let board: IBoard;

</script>

<div class="card" on:click={() => { activeBoardId.set(board.id); switcherOpened.set(false); }}>
    <div class="header">
        {#if board.headerImage}
        <img
            src="{board.headerImage}"
            alt=""
            class="w-full"
            />
        {/if}
    </div>
    <div class="p-8">
        <h3>
            <a
            href="/board/{board.id}"
            class="
            font-semibold
            text-dark text-xl
            text-xl
            mb-4
            block
            hover:text-primary
            ">
            {board.title}
            </a>
        </h3>
        <p class="leading-relaxed">
            <small>
                Lorem ipsum dolor sit amet pretium consectetur adipiscing
                elit. Lorem consectetur adipiscing elit.
            </small>
        </p>
    </div>
</div>

<style lang="postcss">
    .card {
        flex-grow: 1;
        flex-shrink: 1;
        width: 23vw;
        max-width: 38ch;
        min-width: 34ch;
        height: 100%;
        @apply  rounded-lg overflow-hidden border-2 border-gray-50 shadow-md;
    }
    .card:hover {
        @apply border-gray-200 cursor-pointer;
    }
    :global(.app-wrapper.dark .card) {
        @apply bg-neutral-900;
    }
    .header {
        max-height: 9rem;
        overflow: hidden;
    }
</style>