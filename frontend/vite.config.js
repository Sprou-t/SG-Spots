import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
	plugins: [
		react(),          // React plugin for Vite
		tailwindcss(),    // Tailwind CSS plugin for PostCSS
		Inspect(),        // Plugin for inspecting Vite build details
	],
	css: {
		postcss: {
			plugins: [tailwindcss()],  // Tailwind CSS as a PostCSS plugin
		},
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),  // Aliases '@components' to 'src/components'
		},
		preserveSymlinks: true,  // Preserve symlink paths to maintain exact casing
	},
	server: {
		watch: {
			usePolling: true,  // Enables polling for file changes, useful for certain environments
		},
		fs: {
			strict: true,  // Enforces strict file system access, preserving case
		},
	},
});
