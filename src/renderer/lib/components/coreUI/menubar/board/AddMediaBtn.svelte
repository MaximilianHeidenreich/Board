<script>
    import Tooltip from "@renderer/lib/components/Tooltip.svelte";
    import Popover from "@renderer/lib/components/Popover.svelte";
    import ThemedElement from "@renderer/lib/components/coreUI/ThemedElement.svelte";
    import ListButton from "@renderer/lib/components/ListButton.svelte";
    import { importLocalAssets } from "@renderer/lib/boardUtils";
    import { get } from "svelte/store";
    import { activeBoardId } from "@renderer/lib/store/activeBoardStore";

</script>

<Popover padding={false} position="b">
    <Tooltip slot="content">
        <button slot="content">
            <ThemedElement>
                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#fff"></path>
                </svg>
                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#0D0D0D"></path>
                </svg>
            </ThemedElement>
        </button>
        <p slot="tooltip">Add media</p>
    </Tooltip>
    <div slot="popover" class="w-fit">
        <ul class="h-btn-list">
            <li on:click={async () => importLocalAssets($activeBoardId)}>
                <ListButton>
                    <div class="w-full flex gap-5 justify-between items-center">
                        <p>Add from File</p>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4Z" fill="#0D0D0D"></path>
                        </svg>
                    </div>
                </ListButton>
            </li>
            <li>
                <ListButton>
                    <div class="w-full flex gap-5 justify-between items-center">
                        <p>Add from URL</p>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M8 8C5.75228 8 4 9.75228 4 12C4 14.2477 5.75228 16 8 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H8C4.64772 18 2 15.3523 2 12C2 8.64772 4.64772 6 8 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H8ZM13 7C13 6.44772 13.4477 6 14 6H16C19.3523 6 22 8.64772 22 12C22 15.3523 19.3523 18 16 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H16C18.2477 16 20 14.2477 20 12C20 9.75228 18.2477 8 16 8H14C13.4477 8 13 7.55228 13 7ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="#0D0D0D"></path>
                        </svg>
                    </div>
                </ListButton>
            </li>
        </ul>
    </div>
</Popover>