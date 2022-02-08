<script lang="ts">
    import { monthToName } from "@common/util";

    import { activeBoard } from "@renderer/lib/store/activeBoardStore";

    import Panel from "../Panel.svelte";

    // STATE
    export let opened: boolean 

    $: createdAt = new Date($activeBoard.board.createdAt)
    $: modifiedAt = new Date($activeBoard.board.modifiedAt)

    $: createdReadable = `${createdAt.getDay()}. ${monthToName(createdAt.getMonth())} ${createdAt.getFullYear()}, ${createdAt.getHours()}:${createdAt.getMinutes()}`
    $: modifiedReadable = `${modifiedAt.getDay()}. ${monthToName(modifiedAt.getMonth())} ${modifiedAt.getFullYear()}, ${modifiedAt.getHours()}:${modifiedAt.getMinutes()}`

</script>

<Panel bind:opened position="pos-l">
    <h2 slot="title">Details</h2>
    <div id="boardDetails">
        <div class="form-control">
            <span class="label txt-muted">Name</span>
            <input type="text" class="w-full text-xl font-bold border-b-2 focus:outline-none" bind:value={$activeBoard.board.title}>
        </div>

        <div class="form-control">
            <span class="label txt-muted">Description</span>
            <textarea rows="4" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300" bind:value={$activeBoard.board.description}></textarea>
        </div>

        <div class="form-control">
            <span class="label txt-muted">Synchronization</span>
            <p>soon :)</p>
        </div>

        <div class="form-control txt-muted">
            <span class="label">Stats</span>
            <div class="text-sm">
                <p><b>Entities: </b> 28</p>
                <br>
                <p><b>Last Modified: </b> {modifiedReadable}</p>
                <p><b>Created: </b> {createdReadable}</p>
                <br>
                <p><b>ID: </b> {$activeBoard.board.id}</p>
            </div>
        </div>

    </div>
</Panel>

<style lang="postcss">
    .label {
        display: block;
        @apply uppercase font-bold mb-1;
    }
</style>