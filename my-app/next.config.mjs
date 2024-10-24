/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                     { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: "GET ,POST, PUT" },
                    // { key: "Access-Control-Allow-Headers", value: "Content-Type, X-CSRF-Token" },
                ],
            },
        ]
    }
};

export default nextConfig;
