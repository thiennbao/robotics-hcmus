import ContactEditor from "@/components/forms/contactEditor";
import { contactSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";

export default async function NavigationEditorPage({ params }: { params: { id: string } }) {
  const key = decodeURI(params.id);

  const data = await db.contact.findUnique({ where: { key } });

  if (!data) notFound();

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = contactSchema.safeParse({
      key: formData.get("key") as string,
      title: formData.get("title") as string,
      address: formData.get("address") as string,
    });

    if (validation.success) {
      await db.contact.update({ where: { key }, data: validation.data });
      revalidatePath("/admin/contacts");
      redirect("/admin/contacts");
    } else {
      return { errors: validation.error.issues };
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTACT DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            Contacts
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data.title}</span>
        </div>
        <ContactEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
