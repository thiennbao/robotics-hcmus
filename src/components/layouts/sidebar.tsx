"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiSolidDirections } from "react-icons/bi";
import { BsPeopleFill, BsWechat } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaBook, FaGears, FaNewspaper } from "react-icons/fa6";
import { IoIosImages } from "react-icons/io";
import { PiPhoneCallFill, PiSquaresFour } from "react-icons/pi";
import { RiQuillPenFill } from "react-icons/ri";

const Sidebar = () => {
  const pathname = usePathname().split("/")[2];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        "bg-gray-800 flex-shrink-0 text-gray-400 transition-[width] duration-700 w-0 z-10",
        isOpen ? "md:w-16 lg:w-72" : "md:w-16"
      )}
    >
      <button onClick={() => setIsOpen(true)} className="fixed left-8 top-8 -translate-x-1/2">
        <div className="w-fit m-auto p-2 rounded-full transition hover:bg-gray-600 hover:text-gray-200">
          <PiSquaresFour className="text-xl" />
        </div>
      </button>
      <div
        className={clsx(
          "transition duration-700 top-0 fixed w-72 h-screen p-6 bg-gray-800 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-600 *:mb-4",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex p-2 justify-between gap-4">
          <Link href="/admin" className="w-4/5">
            <img src="/logo.svg" alt="Logo" />
          </Link>
          <button onClick={() => setIsOpen(false)} className="w-1/5">
            <div className="w-full aspect-square flex justify-center items-center rounded-full transition hover:bg-gray-600 hover:text-gray-200">
              <PiSquaresFour className="text-xl" />
            </div>
          </button>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">GENERAL</p>
          <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-600 hover:*:text-gray-200">
            <Link
              href="/admin/navigations"
              className={clsx(pathname === "navigations" && "bg-gray-600 text-gray-200")}
            >
              <BiSolidDirections className="inline mr-2" />
              Navigations
            </Link>
            <Link
              href="/admin/contacts"
              className={clsx(pathname === "contacts" && "bg-gray-600 text-gray-200")}
            >
              <PiPhoneCallFill className="inline mr-2" />
              Contacts
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">CONTENT</p>
          <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-600 hover:*:text-gray-200">
            <Link
              href="/admin/banners"
              className={clsx(pathname === "banners" && "bg-gray-600 text-gray-200")}
            >
              <IoIosImages className="inline mr-2" />
              Banner
            </Link>
            <Link
              href="/admin/courses"
              className={clsx(pathname === "courses" && "bg-gray-600 text-gray-200")}
            >
              <FaBook className="inline mr-2" />
              Courses
            </Link>
            <Link
              href="/admin/news"
              className={clsx(pathname === "news" && "bg-gray-600 text-gray-200")}
            >
              <FaNewspaper className="inline mr-2" />
              News
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">CUSTOMER</p>
          <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-600 hover:*:text-gray-200">
            <Link
              href="/admin/messages"
              className={clsx(pathname === "messages" && "bg-gray-600 text-gray-200")}
            >
              <BsWechat className="inline mr-2" />
              Messages
            </Link>
            <Link
              href="/admin/registers"
              className={clsx(pathname === "registers" && "bg-gray-600 text-gray-200")}
            >
              <RiQuillPenFill className="inline mr-2" />
              Registers
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">AUTH</p>
          <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-400 hover:*:text-gray-200">
            <Link
              href="/admin/users"
              className={clsx(pathname === "users" && "bg-gray-600 text-gray-200")}
            >
              <BsPeopleFill className="inline mr-2" />
              Users
            </Link>
            <Link
              href="/admin/account"
              className={clsx(pathname === "account" && "bg-gray-600 text-gray-200")}
            >
              <FaGears className="inline mr-2" />
              Account
            </Link>
            <Link href="">
              <CiLogout className="inline mr-2" />
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
