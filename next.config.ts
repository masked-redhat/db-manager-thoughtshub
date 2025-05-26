import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: 'https://api.thoughtshub.agency/uploads/:path*',
            }
        ];
    },
};

export default nextConfig;
