<script lang="ts">
    import { onMount } from "svelte";
    import cloud from "$lib/assets/feather-icons/cloud.svg";
    import drizzle from "$lib/assets/feather-icons/drizzle.svg";
    import sun from "$lib/assets/feather-icons/sun.svg";
    import thunder from "$lib/assets/feather-icons/thunder.svg";

    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { codes = {}, card = {} } = data;
    console.log("Page Props:", data);

    const svgMap: Map<string, string> = new Map([
        ["cloud", cloud],
        ["drizzle", drizzle],
        ["sun", sun],
        ["thunder", thunder],
    ]);
</script>

<div>
    {#if codes.median}
        <svg
            width={card.width}
            height={card.height}
            viewBox="0 0 601.065 301.06503"
            version="1.1"
            id="card"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs id="defs1" />
            <rect
                style="fill:#fff9f9;fill-opacity:1;stroke:#1a1919;stroke-width:1.065;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                id="rect5"
                width="600"
                height="300"
                x="0.53250229"
                y="0.53250343"
                rx="5"
                ry="5"
            />
            <circle
                style="fill:#fff9f9;fill-opacity:1;stroke:#1a1919;stroke-width:1.43425;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                id="path5"
                cx="300.5325"
                cy="140.43063"
                r="100"
            />
            <text
                xml:space="preserve"
                style="font-size:22.5778px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#1a1919;stroke-width:1.065;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                x="260.58109"
                y="31.703608"
                id="text7"
                ><tspan
                    id="tspan7"
                    style="fill:#000000;fill-opacity:1;stroke-width:1.065"
                    x="260.58109"
                    y="31.703608">Median</tspan
                ></text
            >
            <text
                xml:space="preserve"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:22.5778px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke:#1a1919;stroke-width:1.065;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                x="182.05556"
                y="271.9321"
                id="text7-7"
                ><tspan id="tspan1" x="182.05556" y="271.9321"
                    >{codes.median.desc}</tspan
                ></text
            >
            <image
                href={svgMap.get(codes.median.svg)}
                x="250.5325"
                y="80.43063"
                width="100"
                height="100"
                id="image1"
            />
        </svg>
    {:else}
        <span>Loading data, this might take a few minutes</span>
    {/if}
</div>
