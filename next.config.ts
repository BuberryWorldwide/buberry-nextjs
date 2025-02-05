/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kxcuyxemzcirpxecmvnt.supabase.co", // ✅ Your actual Supabase project ID
        pathname: "/storage/v1/object/public/avatars/**",
      },
    ],
  },
};

module.exports = nextConfig;
