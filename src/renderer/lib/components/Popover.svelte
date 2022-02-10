<script lang="ts">
    import { createPopper } from "@popperjs/core"
    import type { Placement } from "@popperjs/core"

    // STATE
    export let  shown: boolean = false,
                pos: Placement = "bottom",
                padded = true
    let button: Element,
	    tooltip: HTMLElement,
        arrow: HTMLElement

    function popToggle() {
        shown = !shown
    }

    // https://popper.js.org/docs/v2/constructors/
    $:  if (shown) createPopper(button, tooltip, {
            placement: pos,
            strategy: "fixed",
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 10],
                    },
                },
                {
                    name: "arrow",
                    options: {
                        element: arrow,
                        padding: 5,
                    },
                },
            ],
        });
    
</script>


<button bind:this={button} on:click={popToggle}>
    <slot name="content"/>
</button>
<div class="bg" class:shown on:click|stopPropagation={() => shown = false}></div>
<div bind:this={tooltip} class="popover" class:shown class:padded>
    <slot name="pop" />
    <div class="arrow" bind:this={arrow}></div>
</div>


<!--<button bind:this={button} on:click={() => {
		show = !show;
		if (show) {
			createPopper(button, tooltip, {
				placement: 'right',
		 		modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 10],
						},
					},
				],
			});
		}
	}} class="button">
	Toggle
</button>-->

<style lang="postcss">
    button {
		position: relative;
	}
    .bg {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 99;
        @apply bg-neutral-100 opacity-30;
    }
    .bg.shown {
        display: block;
    }
	
    .arrow { /* TODO: FIX */
        color: black;
    }
    .popover.shown {
		display: block;
	}

	.popover {
		display: none;
        position: block;
        position: absolute;
        z-index: 100;

		@apply bg-white border-2 rounded-xl shadow-xl;
        
	}
    .popover.padded {
        @apply px-4 py-4;
    }
	
	
</style>
