import {
  CreateButton,
  DeleteButton,
  ItemsPerPage,
  Pagination,
  SearchBar,
  ViewButton,
} from "@/components/utils/tableUtils";
import { Suspense } from "react";
import db from "@/lib/db";
import Image from "next/image";
import { courseDeleteAction } from "@/lib/actions";

export default async function CourseDashboardPage({
  searchParams,
}: {
  searchParams: { key: string; page: string; items: string };
}) {
  const { key, page, items } = searchParams;

  const totalItems = await db.course.count({
    where: { name: { contains: key, mode: "insensitive" } },
  });
  const itemsPerPage = Math.max(Number(items) || 5, 1);
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

  const courses = await db.course.findMany({
    where: { name: { contains: key, mode: "insensitive" } },
    orderBy: { order: "asc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">COURSE DASHBOARD</h2>
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
                  <div className="w-64">Tên khóa học</div>
                </th>
                <th>
                  <div className="w-64">Mô tả tóm tắt</div>
                </th>
                <th>
                  <div className="w-64">Tổng quan</div>
                </th>
                <th>
                  <div className="w-64">Tổ chức</div>
                </th>
                <th>
                  <div className="w-64">Nội dung</div>
                </th>
                <th>
                  <div className="w-64">Khung giờ</div>
                </th>
                <th>
                  <div className="w-24">Hành động</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {courses.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <span>{item.order}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-64 p-4 flex items-center gap-4 text-nowrap text-ellipsis overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={128}
                          height={128}
                          priority
                          className="w-8 h-8 object-cover"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">{item.brief}</div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">{item.overview}</div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">{item.organization}</div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">{item.description}</div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">{item.time}</div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.name} edit />
                        <DeleteButton itemName={item.name} action={courseDeleteAction.bind(null, item.name)} />
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
