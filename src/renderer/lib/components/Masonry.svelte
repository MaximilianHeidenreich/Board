<!-- 
  An almost direct copy and paste of: https://css-tricks.com/a-lightweight-masonry-solution
  Usage:
    - stretchFirst stretches the../store/activeBoardStore  <Masonry stretchFirst={true} >
    {#each data as o}
      <div class="_card _padding">
        Here's some stuff {o.name}
        <header>
          <h3>{o.name}</h3>
        </header>
        <section>
          <p>{o.text}</p> 
        </section>
      </div>
    {/each}
  </Masonry>
 -->



<div bind:this={masonryElement} 
     class={`__grid--masonry ${stretchFirst ? '__stretch-first' : ''}`}
     style={`--grid-gap: ${gridGap}; --columns: ${columns}; --col-width: ${colWidth};`}
     >
  <slot></slot>
</div>



<script lang="ts">
    import { onMount, onDestroy, getContext, setContext, tick } from 'svelte'
    export let  stretchFirst = false,
                gridGap = '0.5em',
                colWidth = 'minmax(Min(20em, 100%), 1fr)',
                columns = 2,
        // @ts-ignore
                items = [] // pass in data if it's dynamically updated
        // @ts-ignore
    let grids = [], masonryElement
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
    $:  if (items) { // update if items are changed
        columns, gridGap;
        // @ts-ignore
        masonryElement = masonryElement // refresh masonryElement
    }

    setTimeout(refreshLayout, 800) // TODO!: Better solution?
</script>

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
    align-self: start 
  }
  :global(.__grid--masonry.__stretch-first > *:first-child) { 
    grid-column: 1/ -1;
  }
</style>