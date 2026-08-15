import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnqjax5ut/image/upload/**"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/hosting", destination: "/services", permanent: false },
      { source: "/hosting/:slug*", destination: "/services", permanent: false },
      { source: "/wordpress-hosting", destination: "/services", permanent: false },
      { source: "/email-hosting", destination: "/services", permanent: false },
      { source: "/vps", destination: "/services", permanent: false },
      { source: "/domains", destination: "/services", permanent: false },
      { source: "/ssl", destination: "/services", permanent: false },
      { source: "/pricing", destination: "/services", permanent: false },
      { source: "/cart", destination: "/contact", permanent: false },
      { source: "/checkout", destination: "/contact", permanent: false },
      { source: "/mobile-app-development", destination: "/services", permanent: false },
      { source: "/knowledgebase", destination: "/about", permanent: false },
      { source: "/products", destination: "/services", permanent: false },
      { source: "/products/:path*", destination: "/services", permanent: false }
    ];
  },
  async headers() {
    const agentLinks = [
      '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
      '</openapi.json>; rel="service-desc"; type="application/json"',
      '</docs/api>; rel="service-doc"; type="text/html"',
      '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"'
    ].join(", ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/",
        headers: [{ key: "Link", value: agentLinks }]
      }
    ];
  }
};

export default nextConfig;
