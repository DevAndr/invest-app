import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__filename, 'styles')],
    },
    images: {
        remotePatterns: [
            {//https://via.placeholder.com/150/92c952
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
