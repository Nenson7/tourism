import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSharp from 'vite-plugin-sharp'

export default defineConfig({
    plugins: [
        react(),
        viteSharp({
            include: [
                'public/static/**/*.{jpg,jpeg,png}',
                'public/logos/**/*.{jpg,jpeg,png}',
                'public/markers/**/*.{jpg,jpeg,png}'
            ],
            jpeg: { 
                quality: 70, // 70% compression as requested
                progressive: true,
                mozjpeg: true
            },
            png: { 
                quality: 70,
                progressive: true,
                compressionLevel: 9
            },
            webp: { 
                quality: 70,
                effort: 6,
                nearLossless: true
            },
            avif: { 
                quality: 70,
                effort: 9
            },
            resize: [
                {
                    width: 1920,
                    height: 1080,
                    withoutEnlargement: true,
                    fit: 'inside'
                },
                {
                    width: 1280,
                    height: 720,
                    withoutEnlargement: true,
                    fit: 'inside'
                },
                {
                    width: 800,
                    height: 600,
                    withoutEnlargement: true,
                    fit: 'inside'
                },
                {
                    width: 400,
                    height: 300,
                    withoutEnlargement: true,
                    fit: 'inside'
                }
            ],
            format: ['webp', 'avif', 'original']
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
                drop_debugger: true
            }
        }
    }
})

