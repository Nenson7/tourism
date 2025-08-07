#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const SIZES = [400, 800, 1280, 1920];

// Optimization settings
const OPTIMIZATION_CONFIG = {
    jpeg: {
        quality: 70,
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
    }
};

async function findImages(dir) {
    const images = [];
    
    async function scanDirectory(currentDir) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            
            if (entry.isDirectory()) {
                await scanDirectory(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (SUPPORTED_FORMATS.includes(ext)) {
                    images.push(fullPath);
                }
            }
        }
    }
    
    await scanDirectory(dir);
    return images;
}

async function optimizeImage(imagePath) {
    try {
        const ext = path.extname(imagePath).toLowerCase();
        const basePath = imagePath.replace(ext, '');
        const relativePath = path.relative(PUBLIC_DIR, imagePath);
        
        console.log(`Optimizing: ${relativePath}`);
        
        // Read the original image
        const image = sharp(imagePath);
        const metadata = await image.metadata();
        
        // Generate optimized versions for each size
        for (const size of SIZES) {
            const resized = image.resize(size, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
            
            // Generate WebP version
            await resized
                .webp(OPTIMIZATION_CONFIG.webp)
                .toFile(`${basePath}-${size}.webp`);
            
            // Generate AVIF version
            await resized
                .avif(OPTIMIZATION_CONFIG.avif)
                .toFile(`${basePath}-${size}.avif`);
            
            // Generate optimized original format
            const optimizedOriginal = resized[ext === '.png' ? 'png' : 'jpeg'](
                ext === '.png' ? OPTIMIZATION_CONFIG.png : OPTIMIZATION_CONFIG.jpeg
            );
            await optimizedOriginal.toFile(`${basePath}-${size}${ext}`);
        }
        
        // Also create optimized versions of the original size
        await image
            .webp(OPTIMIZATION_CONFIG.webp)
            .toFile(`${basePath}.webp`);
        
        await image
            .avif(OPTIMIZATION_CONFIG.avif)
            .toFile(`${basePath}.avif`);
        
        // Optimize the original file
        const optimizedOriginal = image[ext === '.png' ? 'png' : 'jpeg'](
            ext === '.png' ? OPTIMIZATION_CONFIG.png : OPTIMIZATION_CONFIG.jpeg
        );
        await optimizedOriginal.toFile(`${basePath}-optimized${ext}`);
        
        console.log(`✅ Optimized: ${relativePath}`);
        
    } catch (error) {
        console.error(`❌ Error optimizing ${imagePath}:`, error.message);
    }
}

async function main() {
    try {
        console.log('🔍 Scanning for images...');
        const images = await findImages(PUBLIC_DIR);
        
        if (images.length === 0) {
            console.log('No images found to optimize.');
            return;
        }
        
        console.log(`Found ${images.length} images to optimize.`);
        console.log('🚀 Starting optimization...\n');
        
        // Process images in parallel with a concurrency limit
        const concurrency = 4;
        const chunks = [];
        for (let i = 0; i < images.length; i += concurrency) {
            chunks.push(images.slice(i, i + concurrency));
        }
        
        for (const chunk of chunks) {
            await Promise.all(chunk.map(optimizeImage));
        }
        
        console.log('\n🎉 Image optimization completed!');
        console.log(`Optimized ${images.length} images with WebP and AVIF formats.`);
        console.log('Generated responsive sizes: 400px, 800px, 1280px, 1920px');
        console.log('Compression: 70% quality for all formats');
        
    } catch (error) {
        console.error('❌ Error during optimization:', error);
        process.exit(1);
    }
}

main(); 