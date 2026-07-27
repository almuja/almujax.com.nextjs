import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
      crawlDelay: 1,
    },
    sitemap: ["https://bymuja.com/sitemap.xml", "https://bymuja.com/geo.kml"],
    host: "https://bymuja.com",
  };
}
