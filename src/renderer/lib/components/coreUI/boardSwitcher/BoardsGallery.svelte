<script lang="ts">
    import { addNewBoard } from "@renderer/lib/boardUtils";
import { boards } from "@renderer/lib/store/boardsStore";

    import ThemedElement from "../ThemedElement.svelte";
    import BoardCard from "./BoardCard.svelte";

</script>

<div id="boardsGallery">
    <!--<div id="filter" class="flex gap-5 justify-start">
        <div class="flex gap-2 justify-between items-center">
            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#0D0D0D"></path>
            </svg>
            <input type="text" placeholder="Search...">
        </div>
        <div class="flex gap-2 justify-between items-center">
            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M6.29289 4.29289C6.68342 3.90237 7.31658 3.90237 7.70711 4.29289L11.7071 8.29289C12.0976 8.68342 12.0976 9.31658 11.7071 9.70711C11.3166 10.0976 10.6834 10.0976 10.2929 9.70711L8 7.41421V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V7.41421L3.70711 9.70711C3.31658 10.0976 2.68342 10.0976 2.29289 9.70711C1.90237 9.31658 1.90237 8.68342 2.29289 8.29289L6.29289 4.29289ZM16 16.5858V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V16.5858L20.2929 14.2929C20.6834 13.9024 21.3166 13.9024 21.7071 14.2929C22.0976 14.6834 22.0976 15.3166 21.7071 15.7071L17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20C16.7348 20 16.4804 19.8946 16.2929 19.7071L12.2929 15.7071C11.9024 15.3166 11.9024 14.6834 12.2929 14.2929C12.6834 13.9024 13.3166 13.9024 13.7071 14.2929L16 16.5858Z" fill="#0D0D0D"></path>
            </svg>
            <p>Filter: Name</p>
        </div>
    </div>-->

    <div id="content">
        <div class="add-board" on:click={() => addNewBoard(true)}>
            <div class="flex flex-col items-center">
                <ThemedElement>
                    <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#fff"></path>
                    </svg>
                    <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#0D0D0D"></path>
                    </svg>
                </ThemedElement>
                <p>Add board</p>
            </div>
        </div>
        {#if $boards}
            {#each $boards as board}
                <BoardCard
                    board={board.board}/>
            {/each}
        {/if}
    </div>
</div>

<style lang="postcss">
    #boardsGallery {
        height: 100%;
    }
    #content {
        height: 100%;
        width: 100%;
        @apply py-4 overflow-x-auto;
        @apply flex gap-10;
    }
    .add-board {
        flex-grow: 1;
        flex-shrink: 1;
        width: 23vw;
        max-width: 38ch;
        min-width: 29ch;
        height: 100%;
        @apply rounded-lg shadow-md flex justify-center items-center;
        @apply border-dashed border-2 cursor-pointer;
    }
</style>