import {
  CreateButton,
  DeleteButton,
  ItemsPerPage,
  Pagination,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import Link from "next/link";
import { Suspense } from "react";
import db from "@/lib/db";
import { contactDeleteAction } from "@/lib/actions";

export default async function ContactDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.contact.count({
    where: { title: { contains: key, mode: "insensitive" } },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const contacts = await db.contact.findMany({
    where: { title: { contains: key, mode: "insensitive" } },
    orderBy: { order: "asc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">CONTACT DASHBOARD</h2>
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
                  <div className="w-32">Thứ tự</div>
                </th>
                <th>
                  <div className="w-96">Tiêu đề</div>
                </th>
                <th className="w-96">
                  <div>Địa chỉ</div>
                </th>
                <th>
                  <div className="w-24">Hành động</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {contacts.map((item) => (
                  <tr key={item.title}>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.order}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-96 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-96 p-4 text-nowrap text-ellipsis">
                        <Link href={item.address} target="blank" className="bg-pink-500">
                          <code className="block w-full bg-gray-800 px-4 py-1 rounded text-ellipsis overflow-hidden">
                            {item.address}
                          </code>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.title} edit />
                        <DeleteButton itemName={item.title} action={contactDeleteAction.bind(null, item.title)} />
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
