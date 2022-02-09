<script lang="ts">
import type { ILoadedBoard } from "@common/interfaces/IBoard";

    import { monthToName, padLeadingZero } from "@common/util";

    import Slider from "../form/Slider.svelte";

    import Panel from "../Panel.svelte";

    // STATE
    export let  board: ILoadedBoard,
                opened: boolean 

    $: createdAt = new Date(board.board.createdAt)
    $: modifiedAt = new Date(board.board.modifiedAt)

    $: createdReadable = `${createdAt.getDay()}. ${monthToName(createdAt.getMonth())} ${createdAt.getFullYear()}, ${padLeadingZero(createdAt.getHours())}:${padLeadingZero(createdAt.getMinutes())}`
    $: modifiedReadable = `${modifiedAt.getDay()}. ${monthToName(modifiedAt.getMonth())} ${modifiedAt.getFullYear()}, ${padLeadingZero(modifiedAt.getHours())}:${padLeadingZero(modifiedAt.getMinutes())}`

</script>

<Panel bind:opened position="pos-l">
    <h3 slot="title" class="sch-bold">Details</h3>
    <div id="boardDetails">
        <section class="mt-0">
            <h5 class="">Name</h5>
            <input type="text" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300" bind:value={board.board.title}>
        </section>

        <section>
            <h5 class="">Description</h5>
            <textarea rows="4" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300" bind:value={board.board.description}></textarea>
        </section>

        <section>
            <h5 class="">Grid View</h5>
            <p></p>
            <h6 class="sch-semibold">Grid Columns</h6>
            <Slider min={1} max={6} bind:value={board.userOverrides.gridSize}/>
            <p></p>
            <h6 class="sch-semibold">Grid Padding</h6>
            <Slider min={0} max={8} bind:value={board.userOverrides.gridPadding}/>
        </section>

        <section>
            <h5 class="">Synchronization</h5>
            <div class="schContent">
                <h6>Not implemented yet.</h6>
            </div>
        </section>

        <section>
            <h5 class="">Stats</h5>
            <div class="schContent">
                <p><small>
                    <b>Entities: </b> {board.board.entities.length}<br>
                    <br>
                    <b>Last Modified: </b> {modifiedReadable}<br>
                    <b>Created: </b> {createdReadable}<br>
                    <b>ID: </b> {board.board.id}<br>
                </small></p>
            </div>
        </section>

    </div>
</Panel>

<style lang="postcss">
</style>