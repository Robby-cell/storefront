import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Tells Tailwind what "bg-primary" and "text-primary" are
				primary: {
					DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
					hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
				}
			}
		},
	},
	preprocess: vitePreprocess(),
	kit: {
		// Use the static adapter with a fallback for any dynamic routes it misses
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.argv.includes('dev') ? 'storefront' : process.env.BASE_PATH
		}
	}
};

export default config;
