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

	function isComplex(value: any): boolean {
		return typeof value === 'object' && value !== null
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

	function isEmpty(value: any): boolean {
		if (Array.isArray(value)) return value.length === 0
		if (typeof value === 'object' && value !== null)
			return Object.keys(value).length === 0
		return false
	}
</script>

<div class="font-mono text-14px leading-normal">
	{#if typeof data === 'object' && data !== null}
		{#if isEmpty(data)}
			<span class="text-purple-600">
				{Array.isArray(data) ? '[]' : '{}'}
			</span>
		{:else}
			<div>
				<div class="flex items-start">
					<span
						class="cursor-pointer select-none mr-2"
						on:click={toggleExpand}
						role="button"
						tabindex="0"
					>
						{expanded ? '▼' : '▶'}
					</span>

					{#if Array.isArray(data)}
						<span class="text-purple-600">[</span>
						{#if !expanded}
							<span class="text-purple-600">...]</span>
						{/if}
					{:else}
						<span class="text-purple-600">{'{'}</span>
						{#if !expanded}
							<span class="text-purple-600">...}</span>
						{/if}
					{/if}
				</div>

				{#if expanded}
					<div class="ml-6">
						{#if Array.isArray(data)}
							{#each data as value, i}
								<span class="flex items-start">
									<svelte:self data={value} expandLevel={expandLevel - 1} />
									{#if i < data.length - 1}
										<span class="text-purple-600">,</span>
									{/if}
								</span>
							{/each}
						{:else}
							{#each Object.entries(data) as [key, value], i}
								<span class="flex items-start">
									{#if isComplex(value)}
										<span class="inline-flex items-start">
											<span class="text-purple-600">{key}: </span>
											<svelte:self data={value} expandLevel={expandLevel - 1} />
											{#if i < Object.entries(data).length - 1}
												<span class="text-purple-600">,</span>
											{/if}
										</span>
									{:else}
										<span class="inline-flex items-start">
											<span class="text-purple-600">{key}: </span>
											<svelte:self data={value} expandLevel={expandLevel - 1} />
											{#if i < Object.entries(data).length - 1}
												<span class="text-purple-600">,</span>
											{/if}
										</span>
									{/if}
								</span>
							{/each}
						{/if}
					</div>
					<div class="ml-4">
						{#if Array.isArray(data)}
							<span class="text-purple-600">]</span>
						{:else}
							<span class="text-purple-600">}</span>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
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
