<script  lang="ts">
    import { createEventDispatcher } from "svelte";

    import { EAssetType } from "@common/interfaces/IAsset";
    import type { IEntity } from "@common/interfaces/IEntity";

    import LocalImageAsset from "./LocalImageAsset.svelte";
    import Tooltip from "@renderer/lib/components/Tooltip.svelte";
    import IconDelete from "../../icons/IconDelete.svelte";
    import IconSwap from "../../icons/IconSwap.svelte";
    import IconMessage from "../../icons/IconMessage.svelte";
    import IconLoader from "../../icons/IconLoader.svelte";
    import CommentsPanel from "../comments/CommentsPanel.svelte";
    import { removeEntityFromActive } from "@renderer/lib/store/activeBoardStore";

    // STATE
    export let entity: IEntity
    export let editable = true

    let commentsPanelOpen = false
    let busyDelete = false

    // API
    const dispatch = createEventDispatcher()
    async function onDelete() { // TODO: ! OBVIOUSLY REMOVE AFTER TESTING
        busyDelete = true
        setTimeout(async () => {
            try {
                await removeEntityFromActive(entity.id)
                busyDelete = false
            }
            catch (e) {
                // TODO: err popup
                console.error(e);
            }
        }, 500)
    }

</script>

<CommentsPanel
        bind:opened={commentsPanelOpen}
        />

<div class="entity relative bg-neutral-100" 
    class:editable 
    draggable={editable} 
    on:dragstart={() => dispatch("dragStart")} 
    on:dragend={() => dispatch("dragEnd")}
    >

    {#if entity.assetType === EAssetType.LOCAL_IMAGE}
        <LocalImageAsset 
            on:load={() => dispatch("load")}
            bind:asset={entity.asset}
            />
    {/if}
    <div class="entityCtrl">
        <div class="overlay"></div>
        <div class="content p-6 flex flex-col justify-between">
            <div class="flex gap-5 justify-end">
                <div class="flex flex-col gap-5">
                    <Tooltip slot="content">
                        <button slot="content" on:click={() => commentsPanelOpen = true}>
                            <IconMessage colorLight="#fff"/>
                            <div class="commentBubble"></div>
                        </button>
                        <p slot="tooltip">Show comments</p>
                    </Tooltip>
                </div>
            </div>
            
            <div class="flex gap-5 justify-end">
                <Tooltip>
                    <button slot="content" disabled={busyDelete} on:click={onDelete}>
                        {#if busyDelete}
                        <IconLoader colorLight="#fff"/>
                        {:else}
                        <IconDelete colorLight="#fff"/>
                        {/if}
                    </button>
                    <p slot="tooltip">Remove media</p>
                </Tooltip>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .entity {
        
    }
    .entityCtrl {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transition: opacity 0.1s 0s ease-in-out;
    }
    .entity.editable:hover .entityCtrl {
        opacity: 1;
    }
    .entityCtrl .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        @apply bg-neutral-800 opacity-60;
    }
    .entityCtrl .content {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .commentBubble {
        position: absolute;
        top: -0.15rem;
        right: -0.28rem;
        @apply w-3 h-3 bg-yellow-400 rounded-full border-2 border-yellow-300;
    }
</style>
