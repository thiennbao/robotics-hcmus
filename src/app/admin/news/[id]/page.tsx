import { createNews, getNewsById, updateNewsById } from "@/lib/query";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAnglesRight } from "react-icons/fa6";
import { ImageField, InputField, RichTextField } from "../../_components/editorUtils";

export default async function NewsEditorPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data
  const data = await getNewsById(id);

  // Redirect to 404 page if not add page and data not found
  if (id !== "add" && !data) {
    notFound();
  }

  // Submit action
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const data = {
      title: formData.get("title") as string,
      thumbnail: formData.get("thumbnail") as string,
      content: formData.get("content") as string,
    };

    // Save to database
    if (id === "add") {
      await createNews(data);
    } else {
      await updateNewsById(id, data);
    }

    // Redirect
    revalidatePath("/admin/news");
    redirect("/admin/news");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">NEWS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/news" className="font-bold hover:text-sky-500 transition">
            News
          </Link>
          <FaAnglesRight className="mx-2 text-sm" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data?.title || "Add"}</span>
        </div>
        <form action={handleSubmit} className="*:mb-4">
          <InputField
            label="News title"
            errorMsg="News title is required"
            inputOpt={{
              name: "title",
              required: true,
              placeholder: "Enter news title",
              defaultValue: data?.title,
            }}
          />
          <ImageField
            label="Thumbnail"
            errorMsg="Thumbnail is required"
            inputOpt={{
              name: "thumbnail",
              required: true,
              defaultValue: data?.thumbnail,
            }}
          />
          <RichTextField
            label="Content"
            errorMsg="Content is require"
            inputOpt={{
              name: "content",
              required: true,
              defaultValue: data?.content,
            }}
          />
          <div className="text-center pt-4">
            <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
