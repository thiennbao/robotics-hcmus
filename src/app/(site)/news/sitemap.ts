import db from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await db.news.findMany({ select: { title: true, date: true } });
  return news.map((item) => ({
    url: `${process.env.BASE_URL}/news/${encodeURIComponent(item.title)}`,
    lastModified: item.date,
    priority: 0.6,
  }));
}

export const dynamic = "force-dynamic";
