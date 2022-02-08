<script lang="ts">
    //import { addTask, finishTask } from "@renderer/lib/store/bufferBusy";

    //export let bufferTimeout = 3000
    export let value: string
    $: buffer = value

    //let lastTimeout: number | undefined
    const onChange = () => {
        console.log("CHANGE!");
        value = buffer
        //addTask()
        /*if (lastTimeout) {
            clearTimeout(lastTimeout)
            lastTimeout = undefined
        }
        lastTimeout = setTimeout(() => {
            value = buffer
            finishTask()
        }, bufferTimeout)*/
    }

</script>

<input on:change={onChange} bind:value={buffer} {...$$restProps}/>