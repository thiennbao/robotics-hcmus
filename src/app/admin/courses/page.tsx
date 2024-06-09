import { ItemsPerPage, Pagination, SearchBar } from "../_components/tableUtils";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import Confirm from "../_components/confirm";

export default async function CoursesDashboardPage({
  searchParams,
}: {
  searchParams: { key?: string; page?: string; items?: string };
}) {
  const { key, page, items } = searchParams;

  // Validate range of items and pages
  const totalItems: number = await prisma.course.count({
    where: { name: { contains: key, mode: "insensitive" } },
  });
  const itemsNum = Number(items) > 0 ? Number(items) : 5;
  const totalPages = Math.ceil(totalItems / itemsNum);
  const pagesNum = Number(page) > 1 ? (Number(page) < totalPages ? Number(page) : totalPages) : 1;

  // Get courses
  const courses = await prisma.course.findMany({
    where: { name: { contains: key, mode: "insensitive" } },
    orderBy: { name: "asc" },
    skip: (pagesNum - 1) * itemsNum,
    take: itemsNum,
  });

  // Delete course
  const handleDelete = async (id: string) => {
    "use server";
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/courses");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSES DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl p-6">
        <div className="flex justify-end md:justify-between">
          <div className="hidden md:flex justify-between gap-x-8">
            <ItemsPerPage className="hidden lg:block" />
            <SearchBar />
          </div>
          <div>
            <Link
              href="/admin/courses/add"
              className="px-8 py-2 flex items-center gap-2 bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg"
            >
              <FaPlus className="font-bold" />
              <span>Add Course</span>
            </Link>
          </div>
        </div>
        <div className="my-8 pb-4 overflow-x-scroll [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-600">
          <table>
            <thead>
              <tr className="*:p-4 *:text-left">
                <th>Course Name</th>
                <th>Description</th>
                <th>Objectives</th>
                <th>Age</th>
                <th>Lesson</th>
                <th>Duration</th>
                <th>Requirement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              <Suspense>
                {courses.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="w-80 p-4 text-nowrap text-ellipsis overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-8 aspect-square object-cover inline mr-2"
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
                      <div className="w-32 p-4 flex gap-4">
                        <Link href={`/admin/courses/${item.id}`}>
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
                            className="hidden peer-checked:block w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-80 cursor-pointer"
                          />
                          <Confirm title="Delete course" className="hidden peer-checked:block">
                            This will permanently delete the course <b>{item.name}</b>. Your action
                            cannot be undone.
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
