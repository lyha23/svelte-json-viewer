<script lang="ts">
	import JsonViewer from './JsonViewer.svelte'
	import { getType, shouldShowComma, isEmpty as isEmptyFn } from './utils'

	export let data: any[]
	export let expandLevel: number
	export let isEmpty: boolean
	export let keyName: string | undefined = undefined

	let expanded = expandLevel > 0

	function toggleExpand() {
		expanded = !expanded
	}
</script>

{#if isEmpty}
	<span class="inline-flex items-start">
		{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
		<span class="text-purple-600">[]</span>
	</span>
{:else}
	<span class="inline-flex items-start flex-col">
		<button
			on:click={toggleExpand}
			class="inline-flex items-start cursor-pointer"
		>
			<span class="select-none mr-1" role="button" tabindex="0">
				{expanded ? '▼' : '▶'}
			</span>
			{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
			<span class="text-purple-600">[</span>
			{#if !expanded}
				<span class="text-purple-600">...]</span>
			{/if}
		</button>
		{#if expanded}
			<span class="ml-4">
				{#each data as value, i}
					<span class="flex items-start">
						<JsonViewer data={value} expandLevel={expandLevel - 1} />

						{#if i < data.length - 1}
							{#if shouldShowComma(value, isEmptyFn(value))}
								<span class="text-purple-600">,</span>
							{/if}
						{/if}
					</span>
				{/each}
			</span>
			<span class="text-purple-600">]</span>
		{/if}
	</span>
{/if}
