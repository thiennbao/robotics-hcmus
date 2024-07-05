import {
  AddButton,
  DeleteButton,
  ItemsPerPage,
  Pagination,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";
import db from "@/lib/db";
import { deleteFile } from "@/lib/storage";

export default async function BannerDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.banner.count({
    where: { name: { contains: key, mode: "insensitive" } },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const banners = await db.banner.findMany({
    where: { name: { contains: key, mode: "insensitive" } },
    orderBy: { order: "asc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const handleDelete = async (name: string) => {
    "use server";

    const oldUrls = await db.banner.findUnique({ where: { name }, select: { image: true } });
    if (oldUrls) await deleteFile(oldUrls.image);
    await db.banner.delete({ where: { name } });
    revalidatePath("/admin/banners");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">BANNER DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <ItemsPerPage className="hidden lg:block" />
            <SearchBar />
          </div>
          <AddButton />
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>
                  <div className="w-24">Order</div>
                </th>
                <th className="w-full">
                  <div>Banner</div>
                </th>
                <th>
                  <div className="w-24">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {banners.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <div className="w-24 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.order}</span>
                      </div>
                    </td>
                    <td className="w-full">
                      <div className="p-4 flex items-center gap-4 text-nowrap text-ellipsis overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={160}
                          height={90}
                          priority
                          className="w-16 h-9"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.name} edit />
                        <DeleteButton
                          itemName={`Banner ${item.name}`}
                          action={handleDelete.bind(null, item.name)}
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
