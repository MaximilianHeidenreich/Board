<script lang="ts">
    import type { IBoard } from "@common/interfaces/IBoard";
    import { switcherOpened } from '@renderer/lib/store/switcherOpenedStore';
    import { EAssetType, IAssetLocalImage } from "@common/interfaces/IAsset";
    import { openBoard } from "@renderer/lib/store/activeBoardStore";


    // STATE
    export let board: IBoard;
    let headerImage = board.entities.find(e => e.assetType === EAssetType.LOCAL_IMAGE)?.asset as IAssetLocalImage
    let cardBG = headerImage ? `url('file://${headerImage.assetPath}')` : "linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%)"
    let filter = headerImage ? "filter: blur(4px);" : ""

</script>

<div class="card" on:click={() => { openBoard(board.id); switcherOpened.set(false); }}>
    <div class="background" style="--crd-bg: {cardBG}; {filter}"></div>
    <!--<div class="header">
        {#if headerImage}
        <img
            src="file://{headerImage.assetPath}"
            alt=""
            class="w-full"
            style="transform: translateY(-50%)"
            />
        {/if}
    </div>-->
    <div class="content p-8">
        <h3>
            <a
            href="/board/{board.id}"
            class="
            font-semibold
            text-dark text-xl
            text-xl
            mb-4
            block
            hover:text-primary
            ">
            {board.title}
            </a>
        </h3>
        <p class="leading-relaxed">
            <small>
                {board.description}
            </small>
        </p>
    </div>
</div>

<style lang="postcss">
    .card {
        isolation: isolate;
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        width: 23vw;
        max-width: 38ch;
        min-width: 34ch;
        height: 100%;
        @apply  rounded-lg overflow-hidden border-2 border-gray-100 shadow-md;
    }
    .card:hover {
        @apply border-gray-200 cursor-pointer;
    }
    :global(.app-wrapper.dark .card) {
        @apply bg-neutral-900;
    }

    .background {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: var(--crd-bg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .content {
    }
    .header {
        max-height: 9rem;
        overflow: hidden;
    }
</style>