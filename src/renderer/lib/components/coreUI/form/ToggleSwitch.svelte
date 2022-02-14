<script lang="ts">
    // STATE
    export let  id = "",
                text = "",
                description = "",
                checked = false,
                disabled = false
</script>

<div class="flex gap-4 items-center">
    <label 
        class="sch-medium"
        for="{id}">{text}</label>
    <input
      {id}
      name="{id}"
      type="checkbox"
      class="w-5 h-5"
      {disabled}
      bind:checked
    />
</div>
{#if description}
<p class="mt-2 max-w-sm text-muted"><small>{description}</small></p>
{/if}

<!--<div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" bind:value={state} class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
</div>

<style lang="postcss">
    .toggle-checkbox:checked {
        right: 0;
        //border-color: #68D391;
        border-color: #000;
        /*@apply: right-0 border-green-400;*/
    }
    .toggle-checkbox:checked + .toggle-label {
        /*@apply: bg-green-400;*/
        //background-color: #68D391;
        background-color: #000;
    }
</style>-->