<script>
    // import Router, { replace } from "svelte-spa-router";
    import { router } from "tinro";
    import PageContent from "../components/coreUI/PageContent.svelte";

</script>
<div>
    <PageContent>
        <div class="h-full flex flex-col gap-5 justify-center items-center">
            <h1>Unknown page :/</h1>
            <button on:click={() => router.goto("/")}>Go home</button>
        </div>
    </PageContent>
</div>

<style lang="postcss">

</style>