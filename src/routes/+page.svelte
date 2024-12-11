<script lang="ts">
	import JsonViewer from '../components/JsonViewer.svelte'

	const sampleData = {
		name: 'JSON查看器',
		version: '1.0.0',
		features: ['可折叠展开', '语法高亮', '类型识别'],
		config: {
			expandLevel: 2,
			theme: 'light',
			showTypes: true,
		},
		isActive: true,
		lastUpdated: null,
		notANumber: NaN,
		emptyValue: null,
	}
</script>

<div class="max-w-800px mx-auto p-8">
	<h1 class="text-gray-800 mb-4 text-2xl font-bold">JSON查看器</h1>

	<div class="bg-gray-100 rounded-lg p-4 border border-gray-300">
		<JsonViewer data={sampleData} expandLevel={2} />
	</div>
</div>
