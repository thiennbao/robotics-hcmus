import AccountEditor from "@/components/forms/accountEditor";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";

export default async function AccountEditPage() {
  const decode = await verifyToken();
  const username = decode.payload.username as string; // TODO: get from token

  const data = await db.user.findUnique({ where: { username } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">ACCOUNT DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <span className="font-bold">{data.username}</span>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">Change password</span>
        </div>
        <AccountEditor data={data} />
      </div>
    </div>
  );
}
