<script lang="ts">
    import { getType, isEmpty } from './utils';
    import PrimitiveValue from './PrimitiveValue.svelte';
    import ArrayViewer from './ArrayViewer.svelte';
    import ObjectViewer from './ObjectViewer.svelte';
    
    export let data: any;
    export let expandLevel = 1;
    export let keyName: string | undefined = undefined;
</script>

<div class="font-mono text-14px leading-normal">
    {#if typeof data === 'object' && data !== null}
        {#if Array.isArray(data)}
            <ArrayViewer {data} {expandLevel} isEmpty={isEmpty(data)} {keyName} />
        {:else}
            <ObjectViewer {data} {expandLevel} isEmpty={isEmpty(data)} {keyName} />
        {/if}
    {:else}
        <span class="inline-flex items-start">
            {#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
            <PrimitiveValue {data} type={getType(data)} />
        </span>
    {/if}
</div> 
