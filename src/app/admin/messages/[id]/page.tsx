import MessageEditor from "@/components/forms/messageEditor";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

export default async function NavigationEditorPage({ params }: { params: { id: string } }) {
  const id = decodeURI(params.id);

  const data = await db.message.findUnique({ where: { id } });

  if (!data) notFound();

  const handleToggleRead = async (id: string, read: boolean) => {
    "use server";

    await db.message.update({ where: { id }, data: { read } });
    revalidatePath("/admin/messages");
    redirect("/admin/messages");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">MESSAGE DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            Messages
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">From: {data.name}</span>
          <div className="mx-2">{data.read ? <MdMarkEmailRead /> : <MdMarkEmailUnread />}</div>
          <span>{data.read ? "Read" : "Unread"}</span>
        </div>
        <MessageEditor data={data} action={handleToggleRead.bind(null, data.id, !data.read)} />
      </div>
    </div>
  );
}
