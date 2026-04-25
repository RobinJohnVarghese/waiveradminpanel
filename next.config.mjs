/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
      },
      images: {
        domains: [
          '127.0.0.1',
          'waiver-api.ajmalk.com',
          'admin.waiverapp.in',
          'waiverapp.in',
          'api.waiverapp.in'
        ],
      },
};

export default nextConfig;
