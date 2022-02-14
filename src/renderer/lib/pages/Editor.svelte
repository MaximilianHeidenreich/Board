<script lang="ts">
    import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import BoardMenuBar from "@components/coreUI/menubar/BoardMenuBar.svelte";
    import BoardMapView from "@components/coreUI/board/BoardMapView.svelte";
    import BoardGridView from "@components/coreUI/board/BoardGridView.svelte";
    import BoardDetailsPanel from "../components/coreUI/board/BoardDetailsPanel.svelte";
    import { activeBoardStore } from "../store/activeBoardStore";
    import { EBoardLayout } from "@common/interfaces/EBoardLayout";
    
    // STATE
    export let board: ILoadedBoard

    let boardDetailsOpen = false

    let commentsVisible = false

</script>

<BoardDetailsPanel
    bind:board
    bind:opened={boardDetailsOpen}
    />

<BoardMenuBar
    bind:board
    commentsVisible={commentsVisible}
    on:openDetails={() => boardDetailsOpen = true}
    on:toggleComments={() => commentsVisible = !commentsVisible}
    />

{#if $activeBoardStore.userOverrides.layout === EBoardLayout.map}
<BoardMapView
    bind:board/>
{:else if $activeBoardStore.userOverrides.layout === EBoardLayout.grid}
<BoardGridView 
    bind:board
    notesVisible={commentsVisible}
    />
{/if}
