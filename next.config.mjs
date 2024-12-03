/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
              },
        ]
    },
    logging: {
        fetches: {
          hmrRefreshes: true,
        },
      },
};

export default nextConfig;
