import { revalidatePath } from "next/cache";
import { ImageField } from "@/components/utils/editorUtils";
import { ItemsPerPage } from "@/components/utils/tableUtils";
import { redirect } from "next/navigation";

export default function ContentDashboardPage({ searchParams }: { searchParams: { tab?: string } }) {
  const { tab } = searchParams;

  // Submit action
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const data = {
      aboutWall: formData.get("wall/about"),
      coursesWall: formData.get("wall/courses"),
      newsWall: formData.get("wall/news"),
      contactWall: formData.get("wall/contact"),
    };

    // Save to database
    console.log(data);

    // Redirect
    revalidatePath("/admin/contents");
    redirect("/admin/contents");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTENTS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <ItemsPerPage />
        </div>
        <form action={handleSubmit} className="*:mb-4">
          {tab === "wall" && (
            <div className="grid lg:grid-cols-2 gap-4">
              <ImageField
                label="About page wall"
                errorMsg="About page wall is required"
                inputOpt={{ name: "wall/about", required: true, defaultValue: "" }}
              />
              <ImageField
                label="Courses page wall"
                errorMsg="Courses page wall is required"
                inputOpt={{ name: "wall/courses", required: true, defaultValue: "" }}
              />
              <ImageField
                label="News page wall"
                errorMsg="News page wall is required"
                inputOpt={{ name: "wall/news", required: true, defaultValue: "" }}
              />
              <ImageField
                label="Contact page wall"
                errorMsg="Contact page wall is required"
                inputOpt={{ name: "wall/contact", required: true, defaultValue: "" }}
              />
            </div>
          )}
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
