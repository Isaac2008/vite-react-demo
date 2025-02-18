import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((mode: any) => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              // const moduleName = id.split('node_modules/')[1].split('/')[0]
              return 'vendor'
            }

            return id
          }
        }
      }
    }
  } as UserConfig
})
