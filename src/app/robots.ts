import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: [
      `${process.env.BASE_URL}/sitemap.xml`,
      `${process.env.BASE_URL}/courses/sitemap.xml`,
      `${process.env.BASE_URL}/news/sitemap.xml`,
    ],
  };
}

export const dynamic = "force-dynamic";
