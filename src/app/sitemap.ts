import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: `${process.env.BASE_URL}/courses`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.BASE_URL}/news`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}

export const dynamic = "force-dynamic";
