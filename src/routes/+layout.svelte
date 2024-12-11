<script lang="ts">
	import '@unocss/reset/tailwind.css'
	import '../styles/globals.scss'
	import '../styles/btn.scss'
	import '../styles/table.scss'
	import '../styles/title.scss'
	import '../styles/input.scss'

	import { onMount } from 'svelte'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	onMount(async () => {
		const currentPlatform = 'macos'
		if (currentPlatform === 'macos') {
			import('virtual:uno.css')
		} else if (currentPlatform === 'windows') {
			import('virtual:uno.css')
		}
	})
</script>

<main class="bg-white">
	{@render children?.()}
</main>
