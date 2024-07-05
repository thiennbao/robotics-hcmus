import NewsEditor from "@/components/forms/newsEditor";
import { newsSchema } from "@/lib/schemas";
import { deleteFile, uploadFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { News } from "@prisma/client";

export default async function NewsEditorPage({ params }: { params: { id: string } }) {
  const title = decodeURI(params.id);

  let data: News | null = null;
  if (title !== "add") {
    data = await db.news.findUnique({ where: { title } });
    if (!data) notFound();
  }

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = newsSchema.safeParse({
      title: formData.get("title") as string,
      thumbnail: formData.get("thumbnail") as string,
      content: formData.get("content") as string,
    });

    if (validation.success) {
      if (title === "add") {
        validation.data.thumbnail = await uploadFile(
          `news/${validation.data.title}.jpeg`,
          validation.data.thumbnail
        );
        await db.news.create({ data: validation.data });
      } else {
        if (validation.data.thumbnail.startsWith("data:")) {
          const oldUrls = await db.news.findUnique({
            where: { title },
            select: { thumbnail: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.thumbnail);
            validation.data.thumbnail = await uploadFile(
              `news/${validation.data.title}.jpeg`,
              validation.data.thumbnail
            );
          }
        }
        await db.news.update({ where: { title }, data: validation.data });
      }
      revalidatePath("/admin/news");
      redirect("/admin/news");
    } else {
      return { errors: validation.error.issues };
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">BANNER DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            News
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {data?.title || "Add a banner"}
          </span>
        </div>
        <NewsEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
