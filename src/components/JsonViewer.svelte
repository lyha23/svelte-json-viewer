<script lang="ts">
	export let data: any
	export let expandLevel = 1

	let expanded = expandLevel > 0

	function toggleExpand() {
		expanded = !expanded
	}

	function getType(value: any): string {
		if (Array.isArray(value)) return 'array'
		if (value === null) return 'null'
		if (Number.isNaN(value)) return 'nan'
		return typeof value
	}

	function getValuePreview(value: any): string {
		const type = getType(value)
		switch (type) {
			case 'array':
				return `Array(${value.length})`
			case 'object':
				return `Object(${Object.keys(value).length})`
			case 'string':
				return `"${value}"`
			case 'nan':
				return 'NaN'
			default:
				return String(value)
		}
	}
</script>

<div class="font-mono text-14px leading-normal">
	{#if typeof data === 'object' && data !== null}
		<div class="pl-6">
			<span
				class="cursor-pointer select-none mr-2"
				on:click={toggleExpand}
				role="button"
				tabindex="0"
			>
				{expanded ? '▼' : '▶'}
			</span>

			<span class="text-purple-600 mr-2">
				{#if Array.isArray(data)}
					[{#if !expanded}...{/if}]
				{:else if !expanded}...{/if}
			</span>

			{#if expanded}
				<div class="ml-4">
					{#each Object.entries(data) as [key, value], i}
						<div class="json-item">
							<span class="text-purple-600 mr-2">{key}:</span>
							<svelte:self data={value} expandLevel={expandLevel - 1} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<span
			class="
      {getType(data) === 'string' ? 'text-red-600' : ''}
      {getType(data) === 'number' ? 'text-blue-700' : ''}
      {getType(data) === 'boolean' ? 'text-blue-600' : ''}
      {getType(data) === 'null' || getType(data) === 'nan'
				? 'text-gray-600 bg-gray-200 text-sm font-bold rounded px-2 py-0.5'
				: ''}
      {!['string', 'number', 'boolean', 'null', 'nan'].includes(getType(data))
				? 'text-blue-800'
				: ''}
    "
		>
			{getValuePreview(data)}
		</span>
	{/if}
</div>
