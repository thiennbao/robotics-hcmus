import { countContacts, deleteContactById, getContacts, readContactById } from "@/lib/query";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ItemsPerPage, Pagination, SearchBar } from "@/components/utils/tableUtils";
import { Suspense } from "react";
import Confirm from "@/components/utils/confirm";

export default async function ContactsDashboardPage({
  searchParams,
}: {
  searchParams: { key?: string; page?: string; items?: string };
}) {
  const { key, page, items } = searchParams;

  // Validate range of items and pages
  const totalItems: number = await countContacts(key);
  const itemsNum = Number(items) > 0 ? Number(items) : 5;
  const totalPages = Math.ceil(totalItems / itemsNum);
  const pagesNum = Number(page) > 1 ? (Number(page) < totalPages ? Number(page) : totalPages) : 1;

  // Get contacts
  const contacts = await getContacts(key, (pagesNum - 1) * itemsNum, itemsNum);

  // Toggle read status
  const handleToggleRead = async (id: string, read: boolean) => {
    "use server";

    await readContactById(id, read);
    revalidatePath("/admin/contacts");
  };

  // Delete contact
  const handleDelete = async (id: string) => {
    "use server";

    await deleteContactById(id);
    revalidatePath("/admin/contacts");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTACTS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex gap-x-8">
          <ItemsPerPage className="hidden sm:block" />
          <SearchBar />
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Subject</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {contacts.map((item) => (
                  <tr key={item.id} className={item.read ? "text-gray-400" : "italic"}>
                    <td>
                      <div className="w-80 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.subject}
                      </div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.name}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.email}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.phone}
                      </div>
                    </td>
                    <td>
                      <div className="w-96 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.message}
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 flex gap-4">
                        <Link href={`/admin/contacts/${item.id}`}>
                          <GrView className="text-sky-400" />
                        </Link>
                        <form action={handleToggleRead.bind(null, item.id, !item.read)}>
                          <button className="cursor-pointer">
                            {item.read ? (
                              <MdMarkEmailRead className="text-emerald-500" />
                            ) : (
                              <MdMarkEmailUnread className="text-amber-500" />
                            )}
                          </button>
                        </form>
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
                            title="Delete contact"
                            className="hidden peer-checked:block fixed z-20 not-italic"
                          >
                            This will permanently delete the contact from <b>{item.name}</b>. Your
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
