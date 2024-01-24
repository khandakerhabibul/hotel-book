/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    url: process.env.NEXT_PUBLIC_Url,
    x_rapidAPI_host: process.env.NEXT_PUBLIC_X_RapidAPI_Host,
    x_rapidAPI_key: process.env.NEXT_PUBLIC_X_RapidAPI_Key,
  },
  images: {
    domains: ['cf.bstatic.com'],
  },
};

export default nextConfig;
