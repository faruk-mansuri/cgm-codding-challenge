/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**', // to access all the images
        // pathname: '**',
      },
    ],
  },
};

export default nextConfig;
