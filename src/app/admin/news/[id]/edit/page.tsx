import NewsEditor from "@/components/forms/newsEditor";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";

export default async function NewsEditPage({ params }: { params: { id: string } }) {
  const title = decodeURI(params.id);
  const data = await db.news.findUnique({ where: { title } });

  if (!data) notFound();

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">NEWS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/news" className="font-bold hover:text-sky-500 transition">
            News
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data.title}</span>
        </div>
        <NewsEditor data={data} />
      </div>
    </div>
  );
}
