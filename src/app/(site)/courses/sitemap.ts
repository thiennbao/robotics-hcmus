import db from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await db.course.findMany({ select: { name: true, date: true } });
  return courses.map((course) => ({
    url: `${process.env.BASE_URL}/courses/${encodeURIComponent(course.name)}`,
    lastModified: course.date,
    priority: 0.7,
  }));
}

export const dynamic = "force-dynamic";
