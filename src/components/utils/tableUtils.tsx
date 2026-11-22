"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { GrChapterAdd, GrView } from "react-icons/gr";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "../admin/actionButton";
import Confirm from "./confirm";

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
  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page"));
  const currentPage = page > 1 ? (page < totalPages ? page : totalPages) : 1;

  const handlePagination = (targetPage: number) => {
    const nextPage = targetPage < 1 ? 1 : targetPage > totalPages ? totalPages : targetPage;
    if (nextPage === currentPage || isPending) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", nextPage.toString());
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const isPrevDisabled = currentPage <= 1 || isPending;
  const isNextDisabled = currentPage >= totalPages || isPending;

  return (
    <div {...props}>
      <div className="w-fit flex *:w-8 *:aspect-square *:mx-1 *:flex *:justify-center *:items-center *:rounded-md *:transition">
        <button
          type="button"
          aria-label="Trang trước"
          disabled={isPrevDisabled}
          onClick={() => handlePagination(currentPage - 1)}
          className={clsx(
            "bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
            isPrevDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-gray-900"
          )}
        >
          <FaCaretLeft />
        </button>
        {Array(totalPages)
          .fill(null)
          .map((_item, index) => {
            const pageNum = index + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                type="button"
                key={index}
                disabled={isPending || isActive}
                onClick={() => handlePagination(pageNum)}
                className={clsx(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                  isActive
                    ? "bg-gray-800 text-white font-semibold cursor-default"
                    : isPending
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-gray-600 cursor-pointer hover:bg-gray-900"
                )}
              >
                {pageNum}
              </button>
            );
          })}
        <button
          type="button"
          aria-label="Trang sau"
          disabled={isNextDisabled}
          onClick={() => handlePagination(currentPage + 1)}
          className={clsx(
            "bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
            isNextDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-gray-900"
          )}
        >
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
      <Link href={`./${encodeURIComponent(itemId)}/edit`}>
        {edit ? <RiEdit2Fill className="text-sky-400" /> : <GrView className="text-sky-400" />}
      </Link>
    </div>
  );
};

export const DeleteButton = ({
  itemName,
  action,
  ...props
}: { itemName: string; action: () => Promise<void> | void } & HTMLAttributes<HTMLDivElement>) => {
  const [confirm, setConfirm] = useState(false);

  const handleDeleteAction = async () => {
    await action();
    setConfirm(false);
  };

  return (
    <div {...props}>
      <button
        type="button"
        aria-label={`Xóa ${itemName}`}
        onClick={() => setConfirm(true)}
        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
      >
        <RiDeleteBin2Fill />
      </button>
      {confirm && (
        <form action={handleDeleteAction}>
          <Confirm
            title="Xóa mục này"
            message={`Xóa vĩnh viễn ${itemName}. Hành động này không thể hoàn lại!`}
            type="warning"
            asSubmit
            loadingText="Đang xóa..."
            close={() => setConfirm(false)}
          />
        </form>
      )}
    </div>
  );
};

const ReadSubmitButton = ({ read }: { read: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending || undefined}
      aria-label={read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
      className={clsx(
        "inline-flex items-center justify-center transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded",
        pending ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
      )}
    >
      {pending ? (
        <Spinner className="w-4 h-4 text-sky-400" />
      ) : read ? (
        <MdMarkEmailRead className="text-emerald-500" />
      ) : (
        <MdMarkEmailUnread className="text-amber-500" />
      )}
    </button>
  );
};

export const ReadButton = ({
  read,
  action,
  ...props
}: { read: boolean; action: () => Promise<void> | void } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <form action={action}>
        <ReadSubmitButton read={read} />
      </form>
    </div>
  );
};
