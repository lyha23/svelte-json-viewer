<script lang="ts">
	import { copyValue } from '../stores'
	export let keyName = ''
	let isHover = false
</script>

<span
	role="button"
	tabindex="0"
	on:mouseenter={() => {
		isHover = true
	}}
	on:mouseleave={() => {
		isHover = false
	}}
	class=""
>
	{#if keyName}<span class="text-purple-600">{keyName}: </span>{/if}
	<span class="text-purple-600">{'{},'}</span>
	<button
		class={isHover ? 'opacity-100' : 'opacity-0'}
		on:click={(e) => {
			copyValue({})
			e.stopPropagation()
		}}
		aria-label="复制"
	>
		<div
			class="w-3 h-3 bg-gray-300 scale-150 hover:bg-gray-500 mask-copy"
		></div>
	</button>
</span>
