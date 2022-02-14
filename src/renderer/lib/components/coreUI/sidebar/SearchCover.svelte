<script lang="ts">
    import Cover from "../../Cover.svelte";

    export let open = true

</script>


<Cover bind:open>
    <div class="flex justify-center">
        <input type="text" placeholder="Search ..."/>
    </div>
</Cover>