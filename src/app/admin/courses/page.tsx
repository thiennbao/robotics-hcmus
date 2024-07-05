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
import Image from "next/image";
import { deleteFile } from "@/lib/storage";

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
    orderBy: { name: "asc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const handleDelete = async (name: string) => {
    "use server";

    const oldUrls = await db.course.findUnique({
      where: { name },
      select: { thumbnail: true, gallery: true },
    });
    if (oldUrls) {
      deleteFile(oldUrls.thumbnail);
      for (let url of oldUrls.gallery) {
        deleteFile(url);
      }
    }
    await db.course.delete({ where: { name } });
    revalidatePath("/admin/courses");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSE DASHBOARD</h2>
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
                  <div className="w-96">Course Name</div>
                </th>
                <th>
                  <div className="w-64">Description</div>
                </th>
                <th>
                  <div className="w-64">Objectives</div>
                </th>
                <th>
                  <div className="w-32">Age</div>
                </th>
                <th>
                  <div className="w-32">Lesson</div>
                </th>
                <th>
                  <div className="w-48">Duration</div>
                </th>
                <th>
                  <div className="w-48">Requirement</div>
                </th>
                <th>
                  <div className="w-24">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {courses.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <div className="w-96 p-4 flex items-center gap-4 text-nowrap text-ellipsis overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={32}
                          height={32}
                          priority
                          className="w-8 h-8"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.description}
                      </div>
                    </td>
                    <td>
                      <div className="w-64 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.objective}
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.age}
                      </div>
                    </td>
                    <td>
                      <div className="w-32 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.lesson}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.duration}
                      </div>
                    </td>
                    <td>
                      <div className="w-48 p-4 text-nowrap text-ellipsis overflow-hidden">
                        {item.requirement}
                      </div>
                    </td>
                    <td>
                      <div className="w-24 p-4 flex gap-4">
                        <ViewButton itemId={item.name} edit />
                        <DeleteButton
                          itemName={`Course ${item.name}`}
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
