import {
  CreateButton,
  DeleteButton,
  ItemsPerPage,
  Pagination,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import db from "@/lib/db";
import Image from "next/image";
import { deleteFile } from "@/lib/storage";
import { newsDeleteAction } from "@/lib/actions";

export default async function NewsDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.news.count({
    where: { title: { contains: key, mode: "insensitive" } },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const news = await db.news.findMany({
    where: { title: { contains: key, mode: "insensitive" } },
    orderBy: { title: "asc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">NEWS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <ItemsPerPage className="hidden lg:block" />
            <SearchBar />
          </div>
          <CreateButton />
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>
                  <div className="w-80">Title</div>
                </th>
                <th>
                  <div className="w-96">Description</div>
                </th>
                <th>
                  <div className="w-32">Date</div>
                </th>
                <th>
                  <div className="w-24">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {news.map((item) => (
                  <tr key={item.title}>
                    <td>
                      <div className="w-80 p-4 flex items-center gap-4 text-nowrap text-ellipsis overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={32}
                          height={32}
                          priority
                          className="w-8 h-8"
                        />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-96 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.content}
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.date.toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.title} edit />
                        <DeleteButton
                          itemName={`News ${item.title}`}
                          action={newsDeleteAction.bind(null, item.title)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </Suspense>
            </tbody>
          </table>
        </div>
        <div>
          <Pagination totalPages={totalPages} className="w-fit ml-auto" />
        </div>
      </div>
    </div>
  );
}
