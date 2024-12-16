<script lang="ts">
	import { onMount } from 'svelte'
	import JsonViewer from '../components/json-viewer/JsonViewer.svelte'
	import { copiedData } from '../components/json-viewer/stores'
	import { toSerializableObject, toJSON } from '../utils'

	const data = {
		avatar: undefined,
		string: 'Lorem ipsum dolor sit amet',
		integer: 42,
		float: 114.514,
		bigint: 123456789087654321n,
		undefined: undefined,
		timer: 0,
		link: 'http://example.com',
		emptyArray: [],
		array: [19, 19, 810, 'test', NaN],
		emptyObject: {},
		object: {
			foo: true,
			bar: false,
			last: null,
		},
		nestedArray: [
			[1, 2],
			[3, 4],
		],
	}
</script>

<div class="max-w-800px mx-auto p-8">
	<h1 class="text-gray-800 mb-4 text-2xl font-bold">JSON查看器</h1>

	<div class="bg-gray-100 rounded-lg p-4 border border-gray-300">
		<JsonViewer {data} expandLevel={3} />
	</div>
</div>
