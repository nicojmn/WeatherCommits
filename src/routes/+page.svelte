<script lang="ts">
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    console.log("Page Props:", data);
</script>

<div>
    {#if data.codes.median}
        <span> Weather median code : {data.codes.median}</span><br />
    {:else}
        <span>Loading data, this might take a few minutes</span>
    {/if}
    <hr />
</div>
