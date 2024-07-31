import UserEditor from "@/components/forms/userEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";

export default async function UserEditPage({ params }: { params: { id: string } }) {
  const username = decodeURI(params.id);
  const data = await db.user.findUnique({ where: { username } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">USER DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/users" className="font-bold hover:text-sky-500 transition">
            Users
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data.username}</span>
        </div>
        <UserEditor data={data} />
      </div>
    </div>
  );
}
