import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSharp from 'vite-plugin-sharp'

export default defineConfig({
    plugins: [
        react(),
        viteSharp({
            include: ['public/static/**/*.{jpg,jpeg,png}'], // your images
            jpeg: { quality: 75 },
            webp: true, // also generate .webp versions
            resize: [
                {
                    width: 1600,               // prevent large image sizes
                    withoutEnlargement: true, // don't upscale small images
                }
            ]
        })
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
                    maps: ['leaflet', 'react-leaflet']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
})

