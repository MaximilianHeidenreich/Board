<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IEntity } from "@common/interfaces/IEntity";
    import BoardEntity from "../entities/BoardEntity.svelte";

    const dispatch = createEventDispatcher()

    // STATE
    export let entity: IEntity
</script>

<div draggable="true" on:dragstart={() => dispatch("dragStart")}>
    <BoardEntity
            entity={entity}
            editable={false}/>
</div>
