<script lang="ts">
	import { copyValue } from './stores'
	import EmptyObjectViewer from './object/empty.svelte'
	import JsonViewer from './JsonViewer.svelte'
	export let data: Record<string, any>
	export let expandLevel: number
	export let isEmpty: boolean
	export let keyName: string | undefined = undefined

	let expanded = expandLevel > 0
	let isHover = false
	let isHighlighted = false

	function toggleExpand() {
		expanded = !expanded
	}

	function handleCopy(e: Event) {
		copyValue(data)
		e.stopPropagation()
		isHighlighted = true
		setTimeout(() => {
			isHighlighted = false
		}, 1000)
	}
</script>

{#if isEmpty}
	<EmptyObjectViewer {keyName} />
{:else}
	<span
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
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<span
			role="button"
			tabindex="0"
			on:click={toggleExpand}
			class="inline-block leading-normal"
		>
			<span class="inline-block leading-normal cursor-pointer">
				{#if expanded}
					<img
						class="w-4 h-4 translate-y-[4px]"
						src="/svg/bottom-forward.svg"
						alt=""
					/>
				{:else}
					<img
						class="w-4 h-4 translate-y-[4px]"
						src="/svg/right-forward.svg"
						alt=""
					/>
				{/if}
			</span>
			<span class="inline-block leading-normal">
				{#if keyName}<span class="text-purple-600 ml--3"
						>{keyName}:
					</span>{/if}<span class="text-purple-600">{'{'}</span>
				{#if !expanded}
					<span class="text-purple-600">...{'}'}</span>
				{/if}
			</span>
			{#if isHover}
				<button
					class="inline-block leading-normal {isHover
						? 'opacity-100'
						: 'opacity-0'}"
					on:click={handleCopy}
					aria-label="复制"
				>
					<div
						class="w-3 h-3 bg-gray-300 scale-150 hover:bg-gray-500 mask-copy"
					></div>
				</button>
			{/if}
		</span>
		{#if expanded}
			<div class="relative ml-4 vertical-line">
				{#each Object.entries(data) as [key, value], i}
					<JsonViewer
						data={value}
						expandLevel={expandLevel - 1}
						keyName={key}
					/>
				{/each}
			</div>
			<span class="text-purple-600 ml--1">{'}'}</span>
		{/if}
	</span>
{/if}

<style>
	.vertical-line::before {
		content: '';
		position: absolute;
		left: -10px;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: rgb(209 213 219); /* bg-gray-300 的颜色值 */
	}

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
