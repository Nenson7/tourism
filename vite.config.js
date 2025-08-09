import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react()
    ],
    base: "/",
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    icons: ['react-icons'],
                    maps: ['leaflet', 'react-leaflet'],
                    animations: ['framer-motion']
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
            },
            mangle: {
                safari10: true
            }
        },
        cssCodeSplit: true,
        sourcemap: false,
        target: 'es2015'
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'react-router-dom']
    }
})

