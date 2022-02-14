<script lang="ts">
    import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import { settingsStore } from "@renderer/lib/store/settingsStore";

    // State
    export let  board: ILoadedBoard,
                notesVisible = false

    //$: entities = $boards.find(e => e.board.id === board.id)?.board.entities.sort((a, b) => a.gridPosition - b.gridPosition)
    //$: entities = $boards.find(e => e.board.id === board.id)?.board.entities
    $: gridGap = ($settingsStore.defaultBoardGridPaddingValue * board.userOverrides.gridPadding).toString() + $settingsStore.defaultBoardGridPaddingUnit;

</script>

<div id="board">
    <!--<CommentsPanel opened={notesVisible}/>-->
    <div id="content">
        map
    </div>
</div>



<style lang="postcss">
    #board {
        @apply pl-12 pr-4 pb-12 pt-10;
        height: 100%;
    }
    #content {
        height: 100%;
        overflow-x: scroll;
        overflow-y: scroll;
        margin-top: .4rem;
        position: relative;
        @apply pr-4 bg-red-50;
    }
</style>