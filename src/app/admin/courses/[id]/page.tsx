import CourseEditor from "@/components/forms/courseEditor";
import { courseSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { Course } from "@prisma/client";
import { deleteFile, uploadFile } from "@/lib/storage";
import { v4 as uuid } from "uuid";

export default async function CourseEditorPage({ params }: { params: { id: string } }) {
  const name = decodeURI(params.id);

  let data: Course | null = null;
  if (name !== "add") {
    data = await db.course.findUnique({ where: { name } });
    if (!data) notFound();
  }

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = courseSchema.safeParse({
      name: formData.get("name") as string,
      thumbnail: formData.get("thumbnail") as string,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      age: formData.get("age") as string,
      lesson: formData.get("lesson") as string,
      duration: formData.get("duration") as string,
      requirement: formData.get("requirement") as string,
      gallery: JSON.parse((formData.get("gallery") as string) || "[]"),
    });

    if (validation.success) {
      if (name === "add") {
        validation.data.thumbnail = await uploadFile(
          `courses/${validation.data.name}.jpeg`,
          validation.data.thumbnail
        );
        validation.data.gallery = await Promise.all(
          validation.data.gallery.map(async (image) =>
            uploadFile(`courses/${validation.data.name}-gallery${uuid()}.jpeg`, image)
          )
        );
        await db.course.create({ data: validation.data });
      } else {
        // Get old urls
        const oldUrls = await db.course.findUnique({
          where: { name },
          select: { thumbnail: true, gallery: true },
        });
        if (oldUrls) {
          if (validation.data.thumbnail !== oldUrls.thumbnail) {
            // Delete and upload new thumbnail
            deleteFile(oldUrls.thumbnail);
            validation.data.thumbnail = await uploadFile(
              `courses/${validation.data.name}.jpeg`,
              validation.data.thumbnail
            );
            // Delete images in gallery
            for (let url of oldUrls.gallery) {
              if (!validation.data.gallery.includes(url)) {
                deleteFile(url);
              }
            }
            // Upload new images
            validation.data.gallery = await Promise.all(
              validation.data.gallery.map(async (image) =>
                image.startsWith("data:")
                  ? await uploadFile(`courses/${validation.data.name}-gallery${uuid()}.jpeg`, image)
                  : image
              )
            );
          }
        }
        await db.course.update({ where: { name }, data: validation.data });
      }
      revalidatePath("/admin/courses");
      redirect("/admin/courses");
    } else {
      return { errors: validation.error.issues };
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">NAVIGATION DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            Courses
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {data?.name || "Add a course"}
          </span>
        </div>
        <CourseEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
