import NavigationEditor from "@/components/forms/navigationEditor";
import { navigationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { Navigation } from "@prisma/client";

export default async function NavigationEditorPage({ params }: { params: { id: string } }) {
  const title = decodeURI(params.id);

  let data: Navigation | null = null;
  if (title !== "add") {
    data = await db.navigation.findUnique({ where: { title } });
    if (!data) notFound();
  }

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = navigationSchema.safeParse({
      title: formData.get("title") as string,
      address: formData.get("address") as string,
    });

    if (validation.success) {
      if (title === "add") {
        await db.navigation.create({ data: validation.data });
      } else {
        await db.navigation.update({ where: { title }, data: validation.data });
      }
      revalidatePath("/admin/navigations");
      redirect("/admin/navigations");
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
            Navigations
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {data?.title || "Add a navigation"}
          </span>
        </div>
        <NavigationEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
