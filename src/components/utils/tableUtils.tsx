"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export const SearchBar = (props: HTMLAttributes<HTMLDivElement>) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((key) => {
    const params = new URLSearchParams(searchParams);
    if (key) {
      params.set("key", key);
    } else {
      params.delete("key");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div {...props}>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
        defaultValue={searchParams.get("key")?.toString()}
        className="p-2 bg-gray-800 border border-transparent focus:border-gray-500 outline-none rounded-lg"
      />
    </div>
  );
};

export const ItemsPerPage = (props: HTMLAttributes<HTMLDivElement>) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (items: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("items", items);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div {...props}>
      <select
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get("items")?.toString()}
        className="mr-2 p-2 bg-gray-800 border border-transparent focus:border-gray-500 rounded-lg"
      >
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
      </select>
      <span>items / page</span>
    </div>
  );
};

export const Pagination = ({
  totalPages,
  ...props
}: { totalPages: number } & HTMLAttributes<HTMLDivElement>) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page"));
  const currentPage = page > 1 ? (page < totalPages ? page : totalPages) : 1;

  const handlePagination = (page: number) => {
    page = page < 1 ? 1 : page > totalPages ? totalPages : page;
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div {...props}>
      <div className="w-fit flex *:w-8 *:aspect-square *:mx-1 *:flex *:justify-center *:items-center *:rounded-md *:cursor-pointer *:transition hover:*:bg-gray-900">
        <div onClick={() => handlePagination(currentPage - 1)} className="bg-gray-600">
          <FaCaretLeft />
        </div>
        {Array(totalPages)
          .fill(null)
          .map((item, index) => (
            <div
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={currentPage === index + 1 ? "bg-gray-800" : "bg-gray-600"}
            >
              {index + 1}
            </div>
          ))}
        <div onClick={() => handlePagination(currentPage + 1)} className="bg-gray-600">
          <FaCaretRight />
        </div>
      </div>
    </div>
  );
};
