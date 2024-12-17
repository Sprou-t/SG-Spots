import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss'

export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
		},
		preserveSymlinks: true, // Preserve symlink paths to maintain exact casing
	},

	server: {
		watch: {
			usePolling: true,
		},
		fs: {
			strict: true, // Enforces strict file system access, preserving case
		},
	},
});
