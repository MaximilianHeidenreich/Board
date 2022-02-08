<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";

    import { settings } from "@renderer/lib/store/settingsStore";

    import { fade } from "svelte/transition";
    import CommentsPanel from "./CommentsSummaryPanel.svelte";
    import Masonry from "@components/Masonry.svelte";
    import BoardEntity from "./entities/BoardEntity.svelte";
    import { data } from "@renderer/lib/store/dataStore";
    import { activeBoard } from "@renderer/lib/store/activeBoardStore";
    import BoardGridRearanger from "./rearranger/BoardGridRearanger.svelte";
import { boards } from "@renderer/lib/store/boardsStore";

    // State
    export let  board: IBoard,
                notesVisible = false,
                rearrange = false

    //$: entities = $boards.find(e => e.board.id === board.id)?.board.entities.sort((a, b) => a.gridPosition - b.gridPosition)
    $: entities = $boards.find(e => e.board.id === board.id)?.board.entities
    $: gridGap = ($settings.defaultBoardGridPaddingValue * $activeBoard.userOverrides.gridPadding).toString() + $settings.defaultBoardGridPaddingUnit;

</script>

<div id="board">
    <CommentsPanel visible={notesVisible}/>
    <div id="content">
        {#if entities}
            {#if !rearrange}
                {#key $activeBoard.board}
                    <Masonry items={entities} stretchFirst={false} gridGap={gridGap} columns={$activeBoard.userOverrides.gridSize} colWidth="1fr">
                        {#each entities as entity}
                            <BoardEntity
                                entity={entity}
                                on:onRearrange={() => rearrange = true}
                                />
                        {/each}
                    </Masonry>
                {/key}
            {:else}
                {#key $boards}
                    <BoardGridRearanger 
                        entities={entities}
                        on:doneRearrange={() => rearrange = false}
                        />
                {/key}
            {/if}
        {/if}
    </div>
</div>



<style lang="postcss">
    #board {
        @apply pl-12 pr-4 py-6;
        @apply flex gap-8;
        height: var(--content-height);
    }
    #content {
        height: 100%;
        overflow-y: auto;
        flex-grow: 1;
        min-width: 30ch;
        margin-top: .4rem;
        @apply pr-4;
    }
</style>