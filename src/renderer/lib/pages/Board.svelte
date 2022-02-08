<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";

    import { boardMapMode } from "@store/boardModeStore";

    import BoardMenuBar from "@components/coreUI/menubar/BoardMenuBar.svelte";
    import BoardMapView from "@components/coreUI/board/BoardMapView.svelte";
    import BoardGridView from "@components/coreUI/board/BoardGridView.svelte";
    import PageContent from "../components/coreUI/PageContent.svelte";
    import BoardDetailsPanel from "../components/coreUI/board/BoardDetailsPanel.svelte";
    
    // STATE
    export let board: IBoard

    let boardDetailsOpen = false

    let commentsVisible = false

</script>

<BoardDetailsPanel
    bind:opened={boardDetailsOpen}
    />

<BoardMenuBar
    board={board}
    commentsVisible={commentsVisible}
    on:openDetails={() => boardDetailsOpen = true}
    on:toggleComments={() => commentsVisible = !commentsVisible}
    />

<PageContent>
    {#if $boardMapMode}
    <BoardMapView/>
    {:else}
    <BoardGridView 
        board={board}
        notesVisible={commentsVisible}
        />
    {/if}
</PageContent>