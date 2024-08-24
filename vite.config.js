import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de resolución y punto de entrada
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define un alias para el directorio src
      '@components': path.resolve(__dirname, 'src/components')
      
    },
  },
  css: {
    postcss: {
      plugins: [postcss()]
    }
  }
})
