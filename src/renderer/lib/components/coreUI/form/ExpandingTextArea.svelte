<script lang="ts">

    // SETTINGS
    const LIMIT = 50;

    // State
    export let value: string
    let expanded = false
    $: truncatedDescription = `${value.slice(0, LIMIT)} ${(value.length > LIMIT) ? "..." : ""}`

    // API
    function expand() {
        expanded = true;
        const cbk = (callback: any) => {
            expanded = false;
            window.removeEventListener("mousedown", callback)
        }
        window.addEventListener("mousedown", () => cbk(cbk))
    }
</script>

<div class="relative">
    {#if expanded}
    <textarea>
        {value}
    </textarea>
    {:else}
    <p class="preview" style="max-width: 20ch; line-height: 1;" on:click={() => expanded = !expanded}>
        <small>{truncatedDescription}</small>
    </p>
    {/if}
</div>

<style lang="postcss">
    textarea {
        position: absolute;
        top: 0;
        left: 0;
        right: 400px;
    }
    .preview {
        @apply cursor-pointer;
    }
</style>