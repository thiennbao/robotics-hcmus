import RegisterEditor from "@/components/forms/registerEditor";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

export default async function NavigationEditorPage({ params }: { params: { id: string } }) {
  const id = decodeURI(params.id);

  const data = await db.register.findUnique({
    where: { id },
    include: { course: { select: { name: true } } },
  });

  if (!data) notFound();

  const handleToggleRead = async (id: string, read: boolean) => {
    "use server";

    await db.register.update({ where: { id }, data: { read } });
    revalidatePath("/admin/registers");
    redirect("/admin/registers");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">MESSAGE DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            Registers
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">From: {data.name}</span>
          <div className="mx-2">{data.read ? <MdMarkEmailRead /> : <MdMarkEmailUnread />}</div>
          <span>{data.read ? "Read" : "Unread"}</span>
        </div>
        <RegisterEditor data={data} action={handleToggleRead.bind(null, data.id, !data.read)} />
      </div>
    </div>
  );
}
