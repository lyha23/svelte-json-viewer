<script lang="ts">
	import { shouldShowComma, isEmpty as isEmptyFn, typeCheckers } from './utils'
	import JsonViewer from './JsonViewer.svelte'

	export let data: any
	export let expandLevel = 1
	export let value: any
	export let i: number
</script>

<span class="flex items-center">
	<JsonViewer data={value} expandLevel={expandLevel - 1} />
</span>
