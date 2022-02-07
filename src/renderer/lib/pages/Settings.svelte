<script>
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
</script>
<div in:fade="{{ duration: 500, easing: quartInOut}}">
    <a href="/"> back</a>
</div>