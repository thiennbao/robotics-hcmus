import {
  AddButton,
  DeleteButton,
  ItemsPerPage,
  Pagination,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import db from "@/lib/db";

export default async function UserDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.user.count({
    where: { username: { contains: key, mode: "insensitive" } },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const users = await db.user.findMany({
    where: { username: { contains: key, mode: "insensitive" } },
    orderBy: [{ role: "desc" }, { username: "asc" }],
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const handleDelete = async (username: string) => {
    "use server";

    await db.user.delete({ where: { username } });
    revalidatePath("/admin/users");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">USER DASHBOARD</h2>
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
                  <div className="w-48">Username</div>
                </th>
                <th>
                  <div className="w-32">Role</div>
                </th>
                <th className="w-full">
                  <div>Created date</div>
                </th>
                <th>
                  <div className="w-24">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {users.map((item) => (
                  <tr key={item.username}>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.username}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.role}</span>
                      </div>
                    </td>
                    <td className="w-full">
                      <div className="p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.date.toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 flex gap-4">
                        <ViewButton itemId={item.username} edit />
                        <DeleteButton
                          itemName={`User ${item.username}`}
                          action={handleDelete.bind(null, item.username)}
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
