/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["scavtkmodjkcobqxdspc.supabase.co"], // ✅ Allow Supabase Storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scavtkmodjkcobqxdspc.supabase.co",
        pathname: "/storage/v1/object/public/avatars/**",
      },
    ],
  },
};

module.exports = nextConfig;
