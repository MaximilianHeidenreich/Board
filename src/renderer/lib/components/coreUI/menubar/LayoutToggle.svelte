<script lang="ts">
import { EBoardLayout } from "@common/interfaces/EBoardLayout";

    import { activeBoardStore } from "@renderer/lib/store/activeBoardStore";
    import Tooltip from "../../Tooltip.svelte";
    import ThemedElement from "../ThemedElement.svelte";

    // API
    function toggleLayout() {
        if ($activeBoardStore.userOverrides.layout === EBoardLayout.grid) {
            $activeBoardStore.userOverrides.layout = EBoardLayout.map
        }
        else if ($activeBoardStore.userOverrides.layout === EBoardLayout.map) {
            $activeBoardStore.userOverrides.layout = EBoardLayout.grid
        }
    }
</script>

<Tooltip>
    <button slot="content" on:click={toggleLayout}>
        {#if true}
        <ThemedElement>
            <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5ZM9 5H5V9H9V5ZM13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5ZM19 5H15V9H19V5ZM3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15ZM9 15H5V19H9V15ZM13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15ZM19 15H15V19H19V15Z" fill="#fff"></path>
            </svg>
            <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5ZM9 5H5V9H9V5ZM13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5ZM19 5H15V9H19V5ZM3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15ZM9 15H5V19H9V15ZM13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15ZM19 15H15V19H19V15Z" fill="#0D0D0D"></path>
            </svg>
        </ThemedElement>
        {:else}
        <ThemedElement>
            <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M8.68377 3.05132C8.88904 2.98289 9.11096 2.98289 9.31623 3.05132L15 4.94591L19.3675 3.49006C20.6626 3.05837 22 4.02231 22 5.38743V17.2792C22 18.1401 21.4491 18.9044 20.6325 19.1766L15.3162 20.9487C15.111 21.0171 14.889 21.0171 14.6838 20.9487L9 19.0541L4.63246 20.5099C3.33739 20.9416 2 19.9777 2 18.6126V6.72076C2 5.8599 2.55086 5.09562 3.36754 4.82339L8.68377 3.05132ZM10 17.2792L14 18.6126V6.72076L10 5.38743V17.2792ZM8 5.38743L4 6.72076V18.6126L8 17.2792V5.38743ZM16 6.72076V18.6126L20 17.2792V5.38743L16 6.72076Z" fill="#fff"></path>
            </svg>
            <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M8.68377 3.05132C8.88904 2.98289 9.11096 2.98289 9.31623 3.05132L15 4.94591L19.3675 3.49006C20.6626 3.05837 22 4.02231 22 5.38743V17.2792C22 18.1401 21.4491 18.9044 20.6325 19.1766L15.3162 20.9487C15.111 21.0171 14.889 21.0171 14.6838 20.9487L9 19.0541L4.63246 20.5099C3.33739 20.9416 2 19.9777 2 18.6126V6.72076C2 5.8599 2.55086 5.09562 3.36754 4.82339L8.68377 3.05132ZM10 17.2792L14 18.6126V6.72076L10 5.38743V17.2792ZM8 5.38743L4 6.72076V18.6126L8 17.2792V5.38743ZM16 6.72076V18.6126L20 17.2792V5.38743L16 6.72076Z" fill="#0D0D0D"></path>
            </svg>
        </ThemedElement>
        {/if}
    </button>
    <span slot="tooltip">
        {#if $activeBoardStore.userOverrides.layout === EBoardLayout.map}
        Grid View
        {:else}
        Map View
        {/if}
    </span>
</Tooltip>