import {
  DeleteButton,
  ItemsPerPage,
  Pagination,
  ReadButton,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import { Suspense } from "react";
import db from "@/lib/db";
import { messageDeleteAction, messageReadAction } from "@/lib/actions";

export default async function MessageDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.message.count({
    where: {
      OR: [
        { name: { contains: key || "", mode: "insensitive" } },
        { email: { contains: key || "", mode: "insensitive" } },
        { phone: { contains: key || "", mode: "insensitive" } },
        { message: { contains: key || "", mode: "insensitive" } },
      ],
    },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const messages = await db.message.findMany({
    where: {
      OR: [
        { name: { contains: key || "", mode: "insensitive" } },
        { email: { contains: key || "", mode: "insensitive" } },
        { phone: { contains: key || "", mode: "insensitive" } },
        { message: { contains: key || "", mode: "insensitive" } },
      ],
    },
    orderBy: { date: "desc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">MESSAGE DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <ItemsPerPage className="hidden lg:block" />
            <SearchBar />
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>
                  <div className="w-64">Ngày tạo</div>
                </th>
                <th>
                  <div className="w-48">Họ tên</div>
                </th>
                <th>
                  <div className="w-48">Email</div>
                </th>
                <th>
                  <div className="w-48">Số điện thoại</div>
                </th>
                <th>
                  <div className="w-64">Nội dung</div>
                </th>
                <th>
                  <div className="w-24">Hành động</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {messages.map((item) => (
                  <tr key={item.id} className={item.read ? "text-gray-400" : "italic"}>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.date.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
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
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.message}
                      </div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.id} />
                        <ReadButton
                          read={item.read}
                          action={messageReadAction.bind(null, item.id, !item.read)}
                          className="not-italic"
                        />
                        <DeleteButton
                          itemName={`Lời nhắn từ ${item.name}`}
                          action={messageDeleteAction.bind(null, item.id)}
                          className="not-italic"
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
