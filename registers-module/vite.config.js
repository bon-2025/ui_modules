import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',   // your module entry point
      name: 'RegistersModule',
      formats: ["es", "umd"], // exports ES modules and UMD
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-bootstrap'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-bootstrap': 'ReactBootstrap'
        }
      }
    }
  }
});
