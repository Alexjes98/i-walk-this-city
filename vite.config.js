import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(obj|mtl|glb|gltf)$/.test(assetInfo.name)) {
            return `assets/3d/[name][extname]`
          }
          if (/\.(png|jpg|jpeg|gif|webp)$/.test(assetInfo.name)) {
            return `assets/textures/[name][extname]`
          }
          return `assets/[name].[hash][extname]`
        },
      }
    }
  },
  publicDir: 'public'
})
