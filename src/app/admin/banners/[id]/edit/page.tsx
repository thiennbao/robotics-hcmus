import BannerEditor from "@/components/forms/bannerEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";

export default async function BannerEditPage({ params }: { params: { id: string } }) {
  const name = decodeURIComponent(params.id);
  const data = await db.banner.findUnique({ where: { name } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">BANNER DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/banners" className="font-bold hover:text-sky-500 transition">
            Banners
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data.name}</span>
        </div>
        <BannerEditor data={data} />
      </div>
    </div>
  );
}
