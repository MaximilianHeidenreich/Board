<script lang="ts">
    import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import CommentsPanel from "./comments/CommentsPanel.svelte";
    import { settingsStore } from "@renderer/lib/store/settingsStore";
    import BoardMasonry from "./BoardMasonry.svelte";
    import { activeBoardStore } from "@renderer/lib/store/activeBoardStore";

    // State
    export let  board: ILoadedBoard,
                notesVisible = false

    //$: entities = $boards.find(e => e.board.id === board.id)?.board.entities.sort((a, b) => a.gridPosition - b.gridPosition)
    //$: entities = $boards.find(e => e.board.id === board.id)?.board.entities
    $: gridGap = ($settingsStore.defaultBoardGridPaddingValue * board.userOverrides.gridPadding).toString() + $settingsStore.defaultBoardGridPaddingUnit;

</script>

<div id="board">
    <CommentsPanel opened={notesVisible}/>
    <div id="content">
        <BoardMasonry bind:entities={$activeBoardStore.board.entities} stretchFirst={false} gridGap={gridGap} columns={board.userOverrides.gridSize} colWidth="1fr">
            
        </BoardMasonry>
    </div>
</div>



<style lang="postcss">
    #board {
        @apply pl-12 pr-4 pb-12 pt-10;
        height: 100%;
    }
    #content {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        flex-grow: 1;
        min-width: 30ch;
        
        @apply pr-4;
    }
</style>