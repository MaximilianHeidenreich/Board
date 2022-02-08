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
            window.removeEventListener("click", callback)
        }
        window.addEventListener("click", () => cbk(cbk))
    }
</script>

<div class="relative">
    {#if expanded}
    <textarea rows="3" class="bg-slate-100" on:click|stopPropagation={() => {}} bind:value={value}></textarea>
    {:else}
    <p class="preview" style="max-width: 20ch; line-height: 1;" on:click|stopPropagation={expand}>
        <small>{truncatedDescription}</small>
    </p>
    {/if}
</div>

<style lang="postcss">
    textarea {
        position: absolute;
        top: -2rem;
        left: 0;
        width: 400px;
        
    }
    .preview {
        @apply cursor-pointer;
    }
</style>