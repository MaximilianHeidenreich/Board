<script lang="ts">

    import Panel from "@components/coreUI/Panel.svelte";
    import Button from "../../buttons/Button.svelte";
    import Tooltip from "@renderer/lib/components/Tooltip.svelte";
    import IconDelete from "../../icons/IconDelete.svelte";

    // STATE
    export let opened: boolean 

</script>

<Panel bind:opened position="pos-l">
    <h3 slot="title" class="sch-bold">Media Comments</h3>
    <div id="content">
        <div class="comments">
               <div class="max-w-md px-8 py-8 bg-white rounded-lg border-2 shadow-md">
                    <!--<div class="flex justify-center -mt-12 md:justify-end">
                        <img class="object-cover w-14 h-14 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80">
                    </div>-->

                    <p class="mt-0">
                        Contradict sexuality sea society against horror marvelous mountains endless snare holiest ocean depths madness. Ocean ideal virtues strong value pious against suicide pious war dead gains pious.
                    </p>
                    
                    <div class="flex justify-between items-center mt-8">
                        <span class="sch-semibold"><small>Max Heidenreich - 24. Jan 2021, 18:34</small></span>
                        <Tooltip>
                            <button slot="content">
                                <IconDelete/>
                            </button>
                            <span slot="tooltip">Delete comment</span>
                        </Tooltip>
                    </div>
                </div>
                
            
        </div>
        <div class="newComment">
            <div>
                <h5>Add comment</h5>
            </div>
            <div>
                WYSWYG
                <textarea rows="4" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300"></textarea>
            </div>
            <Button class="w-full">Add comment</Button>
        </div>
        <!--<section class="mt-0">
            <h5 class="">Name</h5>
            <input type="text" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300" bind:value={$activeBoard.board.title}>
        </section>

        <section>
            <h5 class="">Description</h5>
            <textarea rows="4" class="py-2 px-3 w-full border-2 rounded-lg focus:outline-none focus:border-neutral-300" bind:value={$activeBoard.board.description}></textarea>
        </section>

        <section>
            <h5 class="">Synchronization</h5>
            <div class="schContent">
                <h6>Not implemented yet.</h6>
            </div>
        </section>

        <section>
            <h5 class="">Stats</h5>
            <div class="schContent">
                <p><small>
                    asdsd
                </small></p>
            </div>
        </section>
    -->
    </div>
</Panel>

<style lang="postcss">
    #content {
        min-width: 45ch;
        min-height: 100%;
        max-height: 100%;
        @apply flex flex-col gap-5 justify-between;
    }
    .comments {
        height: auto;
        flex-grow: 0;
        @apply overflow-y-scroll;
    }
    .newComment {
        min-height: 12rem;
        @apply flex flex-col gap-3;
    }
</style>