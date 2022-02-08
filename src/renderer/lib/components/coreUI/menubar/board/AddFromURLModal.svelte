<script lang="ts">
import Button from "../../buttons/Button.svelte";
import ToggleSwitch from "../../form/ToggleSwitch.svelte";


     let urlMenuOpened = false
</script>

<div class="modal">
    <div class="header flex justify-start">
        <Button>Back</Button>
    </div>
    <div class="content">
        <div class="form-group group-h flex justify-between">
            <p>Cache media: </p>
            <ToggleSwitch/>
        </div>
    </div>
    <div class="footer flex justify-items-stretch">
        <Button class="w-full">Add media</Button>
    </div>
</div>

<style lang="postcss">
    .modal {
        @apply p-4;
    }
    .modal .content {
        @apply py-4;
    }
</style>