import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.BASE_URL as string,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL as string}/about`,
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: `${process.env.BASE_URL as string}/courses`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${process.env.BASE_URL as string}/news`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL as string}/contact`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
