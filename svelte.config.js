import adapter from '@sveltejs/adapter-static'
// import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		vitePreprocess(),
		UnoCSS({
			configOrPath: 'uno.config.ts',
		}),
		preprocess({
			typescript: {
				// 额外的 TypeScript 选项
			},
			scss: {
				// prependData: `@import "./src/styles/globals.scss";`,
			},
		}),
	],
	kit: {
		prerender: {
			handleHttpError: ({ path, referrer, message, error }) => {
				// ignore deliberate link to shiny 404 page
				if (
					path === '/not-found'
					&& referrer === '/blog/how-we-built-our-404-page'
				) {
					return
				}

				console.error(error)
				// otherwise fail the build
				return new Response('Custom error page', {
					status: error,
					message,
				})
			},
		},

		alias: {
			'/@': './src',
			'/#': './types',
			'@': './src',
			'$lib': './src/lib',
		},
		adapter: adapter({
			fallback: 'index.html',
		}),
	},
	vitePlugin: {
		inspector: {
			showToggleButton: 'always',
			toggleKeyCombo: 'meta-shift',
		},
	},
	features: {
		inlineStyles: false,
	},
}
