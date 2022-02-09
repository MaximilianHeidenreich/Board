<!-- 
  An almost direct copy and paste of: https://css-tricks.com/a-lightweight-masonry-solution
 -->
<script lang="ts">
    import type { IEntity } from '@common/interfaces/IEntity';
    import { arrayInsert } from '@common/util';

    import { onMount, onDestroy, getContext, setContext, tick } from 'svelte'
    import IconSwap from '../icons/IconSwap.svelte';
    import BoardEntity from './entities/BoardEntity.svelte';

    // STATE
    export let  stretchFirst = false,
                gridGap = '0.5em',
                colWidth = 'minmax(Min(20em, 100%), 1fr)',
                columns = 2,
        // @ts-ignore
                entities: IEntity[] = [] // pass in data if it's dynamically updated
        // @ts-ignore
    let grids = [], masonryElement

    let reorderActive = false
    $: entitiesEditable = !reorderActive
    let reorderDraggedEntity: IEntity | undefined

    export const refreshLayout = async () => {
        // @ts-ignore
        grids.forEach(async grid => {
            /* get the post relayout number of columns */
            let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length
            
            // @ts-ignore
            grid.items.forEach(c => {
            let new_h = c.getBoundingClientRect().height;
            
            if(new_h !== +c.dataset.h) {
                c.dataset.h = new_h
                grid.mod++
            }
            });
            
            /* if the number of columns has changed */
            if(grid.ncol !== ncol || grid.mod) {
            /* update number of columns */ 
            grid.ncol = ncol;
            /* revert to initial positioning, no margin */
            // @ts-ignore
            grid.items.forEach(c => c.style.removeProperty('margin-top'))
            /* if we have more than one column */
            if(grid.ncol > 1) {
            // @ts-ignore
                grid.items.slice(ncol).forEach((c, i) => {
                let prev_fin = grid.items[i].getBoundingClientRect().bottom /* bottom edge of item above */, 
                        curr_ini = c.getBoundingClientRect().top /* top edge of current item */;
                
                c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`
                })
            }
            
            grid.mod = 0
            }
        })
    }
    // @ts-ignore
    const calcGrid = async (_masonryArr) => {
        await tick()
        if(_masonryArr.length && getComputedStyle(_masonryArr[0]).gridTemplateRows !== 'masonry') {
            // @ts-ignore
            grids = _masonryArr.map(grid => {
                return {
                _el: grid, 
                gap: parseFloat(getComputedStyle(grid).gridRowGap),
                items: [...grid.childNodes].filter(c => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1), 
                ncol: 0, 
                mod: 0
                }
            })
            refreshLayout() /* initial load */
        }
    }
    // @ts-ignore
    let _window
    onMount(() => {
        _window = window
        _window.addEventListener('resize', refreshLayout, false) /* on resize */
        setTimeout(refreshLayout, 100)
    })
    onDestroy(() => {
        // @ts-ignore
        if(_window) {
            // @ts-ignore
            _window.removeEventListener('resize', refreshLayout, false) /* on resize */
        }
    })


    // @ts-ignore
    $: if(masonryElement) { 
        // @ts-ignore
        calcGrid([masonryElement])
    }

    // @ts-ignore
    $:  if (entities) { // update if items are changed
        columns, gridGap;
        // @ts-ignore
        masonryElement = masonryElement // refresh masonryElement
    }

    // API
    function reorder(targetPosition: number) {
        console.log("reorder", targetPosition);
        
        if (!reorderDraggedEntity) return
        targetPosition = targetPosition < 0 ? 0 : targetPosition
        targetPosition = targetPosition > entities.length ? entities.length : targetPosition
        entities = entities.filter(e => e.id !== reorderDraggedEntity?.id)
        arrayInsert(entities, targetPosition, reorderDraggedEntity)
        reorderActive = false
    }

    //setTimeout(refreshLayout, 800) // TODO!: Better solution?
</script>

<div bind:this={masonryElement} 
    class={`__grid--masonry ${stretchFirst ? '__stretch-first' : ''}`}
    style={`--grid-gap: ${gridGap}; --columns: ${columns}; --col-width: ${colWidth};`}
    {...$$restProps}>
    {#key entities}
    {#each entities as entity}
        <div class="relative">
            {#if reorderActive && entity !== reorderDraggedEntity}
                <div class="schUI dropOverlay">
                    <div class="relative w-full flex" on:drop={() => reorder(entities.findIndex(e => e.id === entity.id))} on:dragover|preventDefault={() => {}}>
                        <div class="bg"></div>
                        <div class="dropzone">
                            <span class="sch-semibold"></span>
                            <IconSwap inverted={true}/>
                        </div>
                    </div>
                </div>
            {/if}
            <!--{entities.findIndex(e => e.id === entity.id)}-->
            <BoardEntity 
                entity={entity}
                editable={entitiesEditable} 
                on:dragStart={() => { reorderDraggedEntity = entity; reorderActive = true }}
                on:dragEnd={() => { reorderActive = false } }
                on:clickReorder={() => reorderActive = true}
                />
        </div>
    {/each}
    {/key}
</div>

<!-- 
  $w: var(--col-width); // minmax(Min(20em, 100%), 1fr);
  $s: var(--grid-gap); // .5em;
 -->

<style lang="postcss">
    :global(.__grid--masonry) {
        display: grid;
        grid-template-columns: repeat(var(--columns), var(--col-width));
        grid-template-rows: masonry;
        justify-content: center;
        grid-gap: var(--grid-gap);
        /*padding: var(--grid-gap);*/
        @apply pb-4;
    }
    :global(.__grid--masonry > *) { 
        align-self: start;
        
    }
    :global(.__grid--masonry.__stretch-first > *:first-child) { 
        grid-column: 1/ -1;
    }

    /* Reorder */
    .dropOverlay {
        @apply absolute pointer-events-auto flex text-white;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    } 
    .dropOverlay .dropzone {
        @apply w-full h-full flex justify-center items-center z-20;
    }
    .dropOverlay :first-child .dropzone {
        @apply border-r-2;
    }
    .dropOverlay :last-child .dropzone {
        @apply border-l-2;
    }
    .dropOverlay .bg {
        @apply absolute bg-neutral-800 opacity-60 z-10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>