<script lang="ts">
	import { getType, isEmpty, shouldShowComma } from './utils'
	import PrimitiveValue from './PrimitiveValue.svelte'
	import ArrayViewer from './ArrayViewer.svelte'
	import ObjectViewer from './ObjectViewer.svelte'
	import { copyValue } from './stores'

	export let data: any
	export let expandLevel = 1
	export let keyName: string | undefined = undefined

	let isHover = false
	let isHighlighted = false

	function handleCopy(e: Event) {
		copyValue(data)
		e.stopPropagation()
		isHighlighted = true
		setTimeout(() => {
			isHighlighted = false
		}, 1000) // 1秒后取消高亮
	}
</script>

<div class="font-mono text-14px leading-normal">
	{#if typeof data === 'object' && data !== null}
		{#if Array.isArray(data)}
			<ArrayViewer {data} {expandLevel} isEmpty={isEmpty(data)} {keyName} />
		{:else}
			<ObjectViewer {data} {expandLevel} isEmpty={isEmpty(data)} {keyName} />
		{/if}
	{:else}
		<div
			role="button"
			tabindex="0"
			on:mouseenter={() => {
				isHover = true
			}}
			on:mouseleave={() => {
				isHover = false
			}}
			class="inline-block leading-normal {isHighlighted ? 'highlight' : ''}"
		>
			{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
			<PrimitiveValue {data} type={getType(data)} />
			<div class="inline-flex items-center">
				<span class="text-purple-600">,</span>
				<button
					class={isHover ? 'opacity-100' : 'opacity-0'}
					on:click={handleCopy}
					aria-label="复制"
				>
					<div
						class="w-3 h-3 bg-gray-300 scale-150 hover:bg-gray-500 mask-copy"
					></div>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes highlight {
		0% {
			background-color: transparent;
		}
		50% {
			background-color: rgba(59, 130, 246, 0.2); /* blue-500 with opacity */
		}
		100% {
			background-color: transparent;
		}
	}

	.highlight {
		animation: highlight 1s ease;
	}
</style>
