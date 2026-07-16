import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        logo: resolve(__dirname, 'logo/index2.html')
      }
    }
  }
});
