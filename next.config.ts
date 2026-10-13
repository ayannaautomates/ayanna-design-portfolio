import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Keep old resume links (LinkedIn, past applications) working.
    return [
      {
        source: "/resume.pdf",
        destination: "/Ayanna_McClintic_Resume.pdf",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{ source: "/creative", destination: "/creative/index.html" }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 440],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
