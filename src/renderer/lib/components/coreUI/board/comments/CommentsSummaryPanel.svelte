<script lang="ts">
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import CommentsCard from "./CommentsCard.svelte";
    import ThemedElement from "../ThemedElement.svelte";

    // STATE
    export let visible = false;
    let expanding = false;
    let width = 300;
    let x = 0;

	/*let start = 0, initial = { x: 0, width: 0}
    let x = 20;
	let width = 40;
	function startExpand(type: any, event: any) {
		expanding = type
		start = event.pageX
		initial = { x, width }
	}
	
	function stopExpand() {
		expanding = false
		start = 0
		initial = { x: 0, width: 0}
	}
	
	function expand(event: MouseEvent) {
		if (!expanding) return;
		
		if (expanding) {
			const delta = start - event.pageX
			x = initial.x - delta
			width = initial.width + delta
			return
		}
		
		if (expanding == 'right') {
			const delta = event.pageX-start
			width = initial.width + delta
			return
		}
	}*/

    /*function stopExpand() {
        expanding = false;
        x = 0;
    }
    function startExpand(e: MouseEvent) {
        expanding = true;
        x = e.clientX;
    }
    function expand(e: MouseEvent) {
        if (!expanding) return;

        const dX = (e.clientX - x) / 50;
        width = width + dX;
    }*/
</script>


<!--<svelte:window on:mouseup={stopExpand} />-->

{#if visible}
<aside id="notes" class="" transition:fly="{{ x: -30, duration: 300, easing: quintOut }}"> <!-- style="width: {width}px; min-width: {width}px; max-width: {width}px;"  on:mousemove={expand} class:expanding -->
    <div id="grabber" > <!-- on:mousedown={startExpand} class:active={expanding} -->

    </div>
    <div id="notesList" class="flex flex-col">
        <div class="flex justify-between items-center w-full pr-2 mb-8">
            <div class="flex gap-3 justify-start items-center w-full">
                <button>
                    <ThemedElement>
                        <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#fff"></path>
                        </svg>
                        <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#0D0D0D"></path>
                        </svg>
                    </ThemedElement>
                </button>
                <input type="text" placeholder="New Note" class="border-0"/>
            </div>
        </div>
        <div class="list">
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
            <CommentsCard/>
        </div>
    </div>
</aside>
{/if}

<style lang="postcss">
    #notes {
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 30ch;
        max-width: 40ch;
    }
    #notesList {
        height: 100%;
    }
    #notesList .list {
        height: 100%;
        @apply pr-2;
        overflow-y: auto;
    }
    #grabber {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        cursor: col-resize;
    }
</style>