import { getContactById, readContactById } from "@/lib/query";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAnglesRight } from "react-icons/fa6";
import { InputField, TextField } from "@/components/utils/editorUtils";
import { revalidatePath } from "next/cache";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

export default async function ContactViewerPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data
  const data = await getContactById(id);

  // Redirect to 404 page if data not found
  if (!data) {
    notFound();
  }

  // Toggle read status
  const handleToggleRead = async (id: string, read: boolean) => {
    "use server";

    await readContactById(id, read);
    revalidatePath("/admin/contacts");
    redirect("/admin/contacts");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTACTS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/contacts" className="font-bold hover:text-sky-500 transition">
            Contacts
          </Link>
          <FaAnglesRight className="mx-2 text-sm" />
          <span className="text-nowrap overflow-hidden text-ellipsis">From: {data.name}</span>
          {data.read ? (
            <MdMarkEmailRead className="mx-2" />
          ) : (
            <MdMarkEmailUnread className="mx-2" />
          )}
          <span>{data.read ? "Read" : "Unread"}</span>
        </div>
        <form action={handleToggleRead.bind(null, data.id, !data.read)} className="*:mb-4">
          <InputField label="Subject" inputOpt={{ defaultValue: data.subject, readOnly: true }} />
          <InputField label="Name" inputOpt={{ defaultValue: data.name, readOnly: true }} />
          <div className="grid lg:grid-cols-2 gap-4">
            <InputField label="Email" inputOpt={{ defaultValue: data.email, readOnly: true }} />
            <InputField label="Phone" inputOpt={{ defaultValue: data.phone, readOnly: true }} />
          </div>
          <TextField label="Message" inputOpt={{ defaultValue: data.message, readOnly: true }} />
          <div className="text-center pt-4">
            {data.read ? (
              <button className="w-1/2 py-2 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition">
                MAKE AS UNREAD
              </button>
            ) : (
              <button className="w-1/2 py-2 rounded-lg border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition">
                MAKE AS READ
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
