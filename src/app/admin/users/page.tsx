import { countUsers, deleteUserById, getUsers } from "@/lib/query";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { ItemsPerPage, Pagination, SearchBar } from "../_components/tableUtils";
import { Suspense } from "react";
import Confirm from "../_components/confirm";

export default async function AccountDashboardPage({
  searchParams,
}: {
  searchParams: { key?: string; page?: string; items?: string };
}) {
  const { key, page, items } = searchParams;

  // Validate range of items and pages
  const totalItems: number = await countUsers(key);
  const itemsNum = Number(items) > 0 ? Number(items) : 5;
  const totalPages = Math.ceil(totalItems / itemsNum);
  const pagesNum = Number(page) > 1 ? (Number(page) < totalPages ? Number(page) : totalPages) : 1;

  // Get users
  const users = await getUsers(key, (pagesNum - 1) * itemsNum, itemsNum);

  // Delete user
  const handleDelete = async (id: string) => {
    "use server";

    await deleteUserById(id);
    revalidatePath("/admin/users");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">USERS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <ItemsPerPage className="hidden lg:block" />
            <SearchBar />
          </div>
          <div>
            <Link
              href="/admin/users/add"
              className="px-8 py-2 flex items-center gap-2 bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg"
            >
              <FaPlus className="font-bold" />
              <span>Add User</span>
            </Link>
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Username</th>
                <th>Role</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {users.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.username}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.role}
                      </div>
                    </td>
                    <td className="w-full">
                      <div className="w-96 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.date.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 flex gap-4">
                        <Link href={`/admin/users/${item.id}`}>
                          <RiEdit2Fill className="text-sky-400" />
                        </Link>
                        <form action={handleDelete.bind(null, item.id)}>
                          <input
                            type="checkbox"
                            id={`confirm-${item.id}`}
                            className="peer hidden"
                          />
                          <label htmlFor={`confirm-${item.id}`} className="cursor-pointer">
                            <RiDeleteBin2Fill className="text-red-400" />
                          </label>
                          <label
                            htmlFor={`confirm-${item.id}`}
                            className="hidden peer-checked:block w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 cursor-pointer z-10"
                          />
                          <Confirm
                            title="Delete course"
                            className="hidden peer-checked:block fixed z-20"
                          >
                            This will permanently delete the user <b>{item.username}</b>. Your
                            action cannot be undone.
                          </Confirm>
                        </form>
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
