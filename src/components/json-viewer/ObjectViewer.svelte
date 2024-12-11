<script lang="ts">
	import JsonViewer from './JsonViewer.svelte'

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
		<span class="inline-flex items-start">
			<span
				class="cursor-pointer select-none mr-1"
				on:click={toggleExpand}
				role="button"
				tabindex="0"
			>
				{expanded ? '▼' : '▶'}
			</span>
			{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
			<span class="text-purple-600">{'{'}</span>
			{#if !expanded}
				<span class="text-purple-600">...}</span>
			{/if}
		</span>
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
							<span class="text-purple-600">,</span>
						{/if}
					</div>
				{/each}
			</span>
			<span class="text-purple-600">{'}'}</span>
		{/if}
	</span>
{/if}
