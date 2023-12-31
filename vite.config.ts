import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), topLevelAwait()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
