import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/theme-test/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-Search",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GoogleOther-Image",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GoogleOther-Video",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PetalBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "MojeekBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DotBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-CloudVertexBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DuckAssistBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: ["https://almujax.com/sitemap.xml"],
    host: "https://almujax.com",
  };
}
