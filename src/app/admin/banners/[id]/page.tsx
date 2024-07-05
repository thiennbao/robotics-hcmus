import BannerEditor from "@/components/forms/bannerEditor";
import { bannerSchema } from "@/lib/schemas";
import { deleteFile, uploadFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { Banner } from "@prisma/client";

export default async function BannerEditorPage({ params }: { params: { id: string } }) {
  const name = decodeURI(params.id);

  let data: Banner | null = null;
  if (name !== "add") {
    data = await db.banner.findUnique({ where: { name } });
    if (!data) notFound();
  }

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = bannerSchema.safeParse({
      name: formData.get("name") as string,
      image: formData.get("image") as string,
      order: Number(formData.get("order")),
    });

    if (validation.success) {
      if (name === "add") {
        validation.data.image = await uploadFile(
          `banners/${validation.data.name}.jpeg`,
          validation.data.image
        );
        await db.banner.create({ data: validation.data });
      } else {
        if (validation.data.image.startsWith("data:")) {
          const oldUrls = await db.banner.findUnique({ where: { name }, select: { image: true } });
          if (oldUrls) {
            deleteFile(oldUrls.image);
            validation.data.image = await uploadFile(
              `banners/${validation.data.name}.jpeg`,
              validation.data.image
            );
          }
        }
        await db.banner.update({ where: { name }, data: validation.data });
      }
      revalidatePath("/admin/banners");
      redirect("/admin/banners");
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
            Banners
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {data?.name || "Add a banner"}
          </span>
        </div>
        <BannerEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
