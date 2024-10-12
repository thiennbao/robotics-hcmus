import MessageEditor from "@/components/forms/messageEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

export default async function NavigationEditPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const data = await db.message.findUnique({ where: { id } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">MESSAGE DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/messages" className="font-bold hover:text-sky-500 transition">
            Messages
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">từ: {data.name}</span>
          <div className="mx-2">{data.read ? <MdMarkEmailRead /> : <MdMarkEmailUnread />}</div>
          <span>{data.read ? "Đã đọc" : "Chưa đọc"}</span>
        </div>
        <MessageEditor data={data} />
      </div>
    </div>
  );
}
