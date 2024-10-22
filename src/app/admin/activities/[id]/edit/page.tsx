import AcitivityEditor from "@/components/forms/activityEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";

export default async function AcitivityEditPage({ params }: { params: { id: string } }) {
  const title = decodeURIComponent(params.id);
  const data = await db.activity.findUnique({ where: { title } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">ACTIVITY DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/activities" className="font-bold hover:text-sky-500 transition">
            Acitivities
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{title}</span>
        </div>
        <AcitivityEditor data={data} />
      </div>
    </div>
  );
}
