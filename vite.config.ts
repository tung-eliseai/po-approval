import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        po_approval: resolve(__dirname, 'po_approval.html'),
        gl_account: resolve(__dirname, 'gl_account.html'),
        po_detail: resolve(__dirname, 'po_detail.html'),
        handoff: resolve(__dirname, 'handoff.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@elise/design-system': resolve(__dirname, 'node_modules/@elise/design-system/dist/index.mjs'),
    },
  },
});
