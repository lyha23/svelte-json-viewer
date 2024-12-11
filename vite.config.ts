// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		proxy: {
			// "/api/lyh":{
			// 	target: 'http://192.168.0.142:8888',
			// 	rewrite: (path) => path.replace(/^\/api/, '/php'),
			// },
			// 代理 "/api" 前缀的请求到 "http://localhost:4000"
			'/api': {
				// target: 'http://192.168.2.11:8080',
				// target: 'http://192.168.2.33:8080',
				target: 'http://localhost:8080',
				changeOrigin: true, // 是否改变源
				rewrite: path => path.replace(/^\/api/, '/api'),
			},
		},
	},
	resolve: {
		alias: {
			'@': '/src',
			'/@': '/src',
			'$lib': '/src/lib',
		},
	},
	plugins: [
		UnoCSS({
			extractors: [extractorSvelte()],
			configFile: 'uno.config.ts',
		}),
		sveltekit(),
	],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				// 生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
		target: 'es6',
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 配置 nutui 全局 scss 变量
				additionalData: ``,
			},
		},
	},
})
