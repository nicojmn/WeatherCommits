<script lang="ts">
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    console.log("Page Props:", data);
</script>

<div>
    {#each data.dates as date}
        <span>{date}</span><br />
    {/each}
</div>
