<script lang="ts">
	import ArrayItem from './ArrayItem.svelte'
	import { copyValue } from './stores'

	export let data: any[]
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
		}, 1000) // 1秒后取消高亮
	}
</script>

{#if isEmpty}
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
		{#if keyName}<span class="text-purple-600 inline-block"
				>{keyName}:
			</span>{/if}
		<span class="text-purple-600 inline-block">{'[],'}</span>
		<button
			class={isHover ? 'opacity-100' : 'opacity-0'}
			on:click={handleCopy}
			aria-label="复制"
		>
			<div
				class="w-3 h-3 bg-gray-300 scale-150 hover:bg-gray-500 mask-copy"
			></div>
		</button>
	</span>
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
				<span class="text-purple-600 ml--2"
					>{keyName ? `${keyName}: ` : ''}[</span
				>
				{#if !expanded}
					<span class="text-purple-600">...]</span>
				{/if}
			</span>

			<button
				class="{isHover
					? 'opacity-100'
					: 'opacity-0'} inline-block leading-normal"
				on:click={handleCopy}
				aria-label="复制"
			>
				<div
					class="w-3 h-3 bg-gray-300 scale-150 hover:bg-gray-500 mask-copy"
				></div>
			</button>
		</span>

		{#if expanded}
			<div class="relative ml-4 vertical-line">
				{#each data as value, i}
					<ArrayItem {data} {expandLevel} {value} {i} />
				{/each}
			</div>
			<span class="text-purple-600 ml--1">{']'}</span>
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
