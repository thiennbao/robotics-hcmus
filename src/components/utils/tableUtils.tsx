"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useDebouncedCallback } from "use-debounce";
import Confirm from "./confirm";
import { GrChapterAdd, GrView } from "react-icons/gr";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

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
        placeholder="Tìm kiếm..."
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
        <option>20</option>
        <option>50</option>
      </select>
      <span>mục / trang</span>
    </div>
  );
};

export const Pagination = ({ totalPages, ...props }: { totalPages: number } & HTMLAttributes<HTMLDivElement>) => {
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
        <button onClick={() => handlePagination(currentPage - 1)} className="bg-gray-600">
          <FaCaretLeft />
        </button>
        {Array(totalPages)
          .fill(null)
          .map((_item, index) => (
            <div
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={currentPage === index + 1 ? "bg-gray-800" : "bg-gray-600"}
            >
              {index + 1}
            </div>
          ))}
        <button onClick={() => handlePagination(currentPage + 1)} className="bg-gray-600">
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
};

export const CreateButton = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Link
        href="./create"
        className="px-8 py-2 flex items-center gap-2 bg-sky-400 hover:bg-sky-500 transition text-white rounded-lg"
      >
        <GrChapterAdd className="font-bold" />
        <span>Tạo mới</span>
      </Link>
    </div>
  );
};

export const ViewButton = ({
  itemId,
  edit,
  ...props
}: { itemId: string; edit?: boolean } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Link href={`./${itemId}/edit`}>
        {edit ? <RiEdit2Fill className="text-sky-400" /> : <GrView className="text-sky-400" />}
      </Link>
    </div>
  );
};

export const DeleteButton = ({
  itemName,
  action,
  ...props
}: { itemName: string; action: () => void } & HTMLAttributes<HTMLDivElement>) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div {...props}>
      <RiDeleteBin2Fill className="text-red-400 cursor-pointer" onClick={() => setConfirm(true)} />
      {confirm && (
        <form action={action}>
          <Confirm
            title="Xóa mục này"
            message={`Xóa vĩnh viễn ${itemName}. Hành động này không thể hoàn lại!`}
            type="warning"
            asSubmit
            close={() => setConfirm(false)}
          />
        </form>
      )}
    </div>
  );
};

export const ReadButton = ({
  read,
  action,
  ...props
}: { read: boolean; action: () => void } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <form action={action}>
        <button className="cursor-pointer">
          {read ? <MdMarkEmailRead className="text-emerald-500" /> : <MdMarkEmailUnread className="text-amber-500" />}
        </button>
      </form>
    </div>
  );
};
