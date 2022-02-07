<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";

    import { settings } from "@renderer/lib/store/settingsStore";

    import CommentsPanel from "./CommentsPanel.svelte";
    import Masonry from "@components/Masonry.svelte";
    import BoardEntity from "./entities/BoardEntity.svelte";
    import { data } from "@renderer/lib/store/dataStore";
    import { activeBoard } from "@renderer/lib/store/activeBoardStore";

    // State
    export let  board: IBoard,
                notesVisible = false;
    
    $: gridGap = ($settings.gridPaddingValue * $settings.userGridPaddingFactor).toString() + $settings.gridPaddingUnit;
</script>

<div id="board">
    <CommentsPanel visible={notesVisible}/>
    <div id="content">
        {#key $data}
            {#key $activeBoard}
                <Masonry stretchFirst={false} gridGap={gridGap} columns={$settings.userGridColumns} colWidth="1fr">
                    {#each board.entities as entity}
                        <BoardEntity
                            entity={entity}
                            />
                    {/each}
                </Masonry>
            {/key}
        {/key}
        <!--<div class="py-32 flex gap-5 justify-center items-center">
            <p>
                <strong>Board</strong> v1.0.0
                <span class="mx-2">•</span>
                Made with 
                <ThemedElement>
                    <span slot="dark">🤍</span>
                    <span slot="light">🖤</span>
                </ThemedElement>
                <span class="ml-1">by <a href="https://www.maximilian-heidenreich.de">Maximilian Vincent Heidenreich</a></span>
            </p>
        </div>-->
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