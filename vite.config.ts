import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The preview page only: `npx vite`, then open /preview/. Not part of the build.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
