<script lang="ts">
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
    import { createPopper } from "@popperjs/core"
    import type { Placement } from "@popperjs/core"

    // STATE
    export let  shown: boolean = false,
                pos: Placement = "bottom",
                padded = true

    let trigger: Element,
	    tooltip: HTMLElement,
        arrow: HTMLElement

    // https://popper.js.org/docs/v2/constructors/
    $:  if (shown) createPopper(trigger, tooltip, {
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

<div class="trigger" bind:this={trigger} on:mouseenter={() => shown = true} on:mouseleave={() => shown = false}>
    <slot name="content"/>
</div>
<div bind:this={tooltip} class="schUI tooltip" class:shown class:padded > <!-- in:fade={{ delay: 800, duration: 200, easing: quartInOut}} out:fade={{ delay: 100, duration: 200, easing: quartInOut}} -->
    <slot name="tooltip" />
    <div class="arrow" bind:this={arrow}></div>
</div>

<style lang="postcss">
    div.trigger {
		position: relative;
	}
    .arrow { /* TODO: FIX */
        color: black;
    }
    .tooltip.shown {
        opacity: 1;
        transition: opacity 0.2s 0.9s ease;
	}
	.tooltip {
		display: block;
        position: block;
        position: absolute;
        z-index: 100;
        opacity: 0;
        pointer-events: none;

		@apply text-sm font-semibold text-white bg-gray-900 border-2 border-gray-700 rounded-xl shadow-xl;        
        transition: opacity 0.2s 0s ease;
	}
    .tooltip.padded {
        @apply px-3 py-2;
    }
    /*.tooltip-wrapper {
    }
    #tooltip {
        @apply inline-block absolute;
        @apply text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm;
        left: 50%;
        top: 2.4rem;
        transform: translateX(-50%);
        width: max-content;
        max-width: 40ch;
    }
    #tooltip.padding {
        @apply py-2 px-3;
    }
    #tooltip::after {
        position: absolute;
        left: 50%;
        top: -7px;
        transform: translateX(-50%);
        content: "";
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 7px solid rgba(0,0,0, 1);
    }

    .tooltip-wrapper.dark #tooltip {
        @apply bg-white text-black;
    }
    .tooltip-wrapper.dark #tooltip::after {
        border-bottom: 7px solid rgba(255,255,255, 1);
    }
    */
</style>