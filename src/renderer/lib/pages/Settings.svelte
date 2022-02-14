<script>
    import { fade } from "svelte/transition";
    import { quartInOut } from "svelte/easing";
import Button from "../components/coreUI/buttons/Button.svelte";
import { settingsStore } from "../store/settingsStore";
import ToggleSwitch from "../components/coreUI/form/ToggleSwitch.svelte";
import { themeStore } from "../store/themeStore";
</script>

<div class="schUI px-12" in:fade="{{ duration: 500, easing: quartInOut}}">
    <h2>Settings</h2>

    <section>
        <div class="mb-6 w-full flex gap-10 items-center">
            <h5 class="flex-shrink-0">Application</h5>
            <div class="flex-grow h-0.5 bg-neutral-100"></div>
        </div>
        <div>
            <form  on:submit|preventDefault={() => 0}>
                <ToggleSwitch
                    bind:checked={$themeStore.darkMode}
                    text="Dark mode"/>
            </form>
        </div>
    </section>

    <section>
        <div class="mb-6 w-full flex gap-10 items-center">
            <h5 class="flex-shrink-0">Board defaults</h5>
            <div class="flex-grow h-0.5 bg-neutral-100"></div>
        </div>
        <div>
            <form on:submit|preventDefault={() => 0}>
                <label for="licenseKey" class="text-sm font-medium block mb-2">License Key</label>
                <div class="flex gap-5 justify-between">
                    <input bind:value={$settingsStore.licenseKey} type="text" id="licenseKey" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black focus:border-black outline-none block w-full p-2.5" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
                    <Button>Activate</Button>
                </div>
            </form>
        </div>
    </section>

    <section>
        <div class="mb-6 w-full flex gap-10 items-center">
            <h5 class="flex-shrink-0">Product activation</h5>
            <div class="flex-grow h-0.5 bg-neutral-100"></div>
        </div>
        <div>
            <form on:submit|preventDefault={() => 0}>
                <label for="licenseKey" class="text-sm font-medium dark:color-red-200 block mb-2">License Key</label>
                <div class="flex gap-5 justify-between">
                    <input bind:value={$settingsStore.licenseKey} type="text" id="licenseKey" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
                    <Button>Activate</Button>
                </div>
            </form>
        </div>
    </section>

    <section>
        <div class="mb-6 w-full flex gap-10 items-center">
            <h5 class="flex-shrink-0">Cloud</h5>
            <div class="flex-grow h-0.5 bg-neutral-100"></div>
        </div>
        <div>
            <form on:submit|preventDefault={() => 0}>
                <ToggleSwitch
                    text="Cloud Backup"
                    description="Automatically stores all your boards in the cloud. This lets you access them from any device and prevents data loss."/>
            </form>
        </div>
    </section>

</div>

<style lang="postcss">
    section {
        @apply mb-16;
    }
</style>