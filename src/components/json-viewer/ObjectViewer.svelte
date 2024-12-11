<script lang="ts">
	import JsonViewer from './JsonViewer.svelte'
	import { getType, isEmpty as isEmptyFn, shouldShowComma } from './utils'

	export let data: Record<string, any>
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
		<span class="text-purple-600">{'{}'}</span>
	</span>
{:else}
	<span class="inline-flex items-start flex-col">
		<button on:click={toggleExpand} class="inline-flex items-start">
			<span class="cursor-pointer mr-1 text-xl">
				{#if expanded}
					<img class="w-4 h-4" src="/svg/bottom-forward.svg" alt="" />
				{:else}
					<img class="w-4 h-4" src="/svg/right-forward.svg" alt="" />
				{/if}
			</span>
			{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
			<span class="text-purple-600">{'{'}</span>
			{#if !expanded}
				<span class="text-purple-600">...}</span>
			{/if}
		</button>
		{#if expanded}
			<span class="ml-4">
				{#each Object.entries(data) as [key, value], i}
					<div class="flex items-start">
						<JsonViewer
							data={value}
							expandLevel={expandLevel - 1}
							keyName={key}
						/>
						{#if i < Object.entries(data).length - 1}
							{#if shouldShowComma(value, isEmptyFn(value))}
								<span class="text-purple-600">,</span>
							{/if}
						{/if}
					</div>
				{/each}
			</span>
			<span class="text-purple-600">{'}'}</span>
		{/if}
	</span>
{/if}
