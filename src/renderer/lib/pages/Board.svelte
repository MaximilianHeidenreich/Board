<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";

    import { onMount } from "svelte";
    import { get } from "svelte/store";

    import { boardMapMode } from "@store/boardModeStore";
    import { data } from "../store/dataStore";

    import BoardMenuBar from "@components/coreUI/menubar/BoardMenuBar.svelte";
    import BoardMapView from "@components/coreUI/board/BoardMapView.svelte";
    import BoardGridView from "@components/coreUI/board/BoardGridView.svelte";
    import PageContent from "../components/coreUI/PageContent.svelte";
    
    // State
    export let board: IBoard;
    let commentsVisible = false;
</script>


<BoardMenuBar
    board={board}
    commentsVisible={commentsVisible}
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