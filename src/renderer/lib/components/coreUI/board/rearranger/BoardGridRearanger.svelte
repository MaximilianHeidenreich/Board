<script lang="ts">
    import type { IEntity } from "@common/interfaces/IEntity";
    import { arrayInsert } from "@common/util";
    import { activeBoard, activeBoardId } from "@renderer/lib/store/activeBoardStore";
    import { boards } from "@renderer/lib/store/boardsStore";
    import { createEventDispatcher } from "svelte";
    import Button from "../../buttons/Button.svelte";
    import BoardEntity from "../entities/BoardEntity.svelte";
    import ArrangeZone from "./ArrangeZone.svelte";
    import RearrangableEntity from "./RearrangableEntity.svelte";


    // STATE
    export let entities: IEntity[]
    
    let currDragEntity: IEntity | undefined

    // API
    const dispatch = createEventDispatcher()
    function rearrange(targetPosition: number) {
        console.log("Reaarange to: " + targetPosition);
        console.log("curr: ", currDragEntity);
        
        

        boards.update(v => {
            let b = v.find(e => e.board.id === $activeBoardId)
            let e = b?.board.entities.find(e => e.id === currDragEntity?.id)
            if (b && e) {
                b.board.entities = b?.board.entities.filter(e => e.id !== currDragEntity?.id)
                arrayInsert(b.board.entities, targetPosition, e)
                //e.gridPosition = targetPosition + 1
            }
            else console.error("!e in rearrange")
            console.log(v);

            return v
        })
    }

</script>

<div class="rearrangeGrid gap-5" style="--cols: {$activeBoard.userOverrides.gridSize}">

    <Button class="mb-8" style="grid-column: span var(--cols);" on:click={() => dispatch("doneRearrange")}>Save changes</Button>
    {#each entities as entity, index}
        <div class="w-full flex gap-5">
            <ArrangeZone 
                on:dropped={() => rearrange(index)}/>
            <RearrangableEntity 
                entity={entity}
                on:dragStart={() => currDragEntity = entity}/>
        </div>
    {/each}
    <ArrangeZone 
            on:dropped={() => rearrange(entities.length)}/>

</div>

<style lang="postcss">
    .rearrangeGrid {
        display: grid;
        grid-template-columns: repeat(var(--cols), 1fr);
    }
</style>