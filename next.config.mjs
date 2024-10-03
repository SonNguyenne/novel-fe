/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // env: {
  //   API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // },
}

export default nextConfig
