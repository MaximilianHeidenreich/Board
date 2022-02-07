<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { fade } from "svelte/transition"
    import { quartInOut } from "svelte/easing"


    // https://github.com/thecodejack/svelte-file-dropzone/blob/master/src/components/Dropzone.svelte

    // State
    let visible = false

    // API
    function onDragover() {
        visible = true
    }
    function onDragLeave() {
        visible = false
    }
    function onDrop() {
        console.log("drop")
        visible = false
        
    }

    onMount(() => {
        window.addEventListener("dragover", onDragover)
        window.addEventListener("dragleave", onDragLeave)
        window.addEventListener("drop", onDrop)
    })
    onDestroy(() => {
        window.removeEventListener("dragover", onDragover)
        window.removeEventListener("dragleave", onDragLeave)
        window.removeEventListener("drop", onDrop)
    })
</script>

<div class="pointer-events-none">
    {#if visible}
    <div class="dropzone" in:fade="{{ duration: 500, easing: quartInOut}}" out:fade="{{ duration: 500, easing: quartInOut}}">
        <div class="visualizer">
            <div class="flex flex-col items-center gap-5">
                <svg fill="none" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4ZM12 12C12.5523 12 13 12.4477 13 13V14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V16H10C9.44772 16 9 15.5523 9 15C9 14.4477 9.44772 14 10 14H11V13C11 12.4477 11.4477 12 12 12Z" fill="#0D0D0D"></path>
                </svg>
                <h5>Drop file to add it to the board :)</h5>
            </div>
        </div>
    </div>
    {/if}
</div>

<style lang="postcss">
    .dropzone {
        z-index: 2000;
        isolation: isolate;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(400px);
    }
    .dropzone .visualizer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        @apply bg-neutral-200 border-neutral-300 border-dashed border-4 rounded-lg m-8;
        @apply flex justify-center items-center;
    }
</style>