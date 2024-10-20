"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsFire, BsPeopleFill, BsWechat } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaBook, FaGears, FaNewspaper } from "react-icons/fa6";
import { IoIosImages } from "react-icons/io";
import { PiPhoneCallFill, PiSquaresFour } from "react-icons/pi";
import { RiQuillPenFill } from "react-icons/ri";

const Sidebar = ({ isRoot, logout }: { isRoot: boolean; logout: () => void }) => {
  const pathname = usePathname().split("/")[2];
  const [isOpen, setIsOpen] = useState(true);

  const sideNavs = {
    general: [{ title: "Contacts", icon: <PiPhoneCallFill /> }],
    content: [
      { title: "Banners", icon: <IoIosImages /> },
      { title: "Courses", icon: <FaBook /> },
      { title: "News", icon: <FaNewspaper /> },
      { title: "Competitions", icon: <BsFire /> },
    ],
    customer: [
      { title: "Messages", icon: <BsWechat /> },
      { title: "Registers", icon: <RiQuillPenFill /> },
    ],
    auth: [{ title: "Account", icon: <FaGears /> }],
  };
  if (isRoot) sideNavs.auth.unshift({ title: "Users", icon: <BsPeopleFill /> });

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
            <Image
              src="/logo-white.png"
              alt="Robotics and IoT HCMUS"
              width={160}
              height={100}
              className="w-auto h-auto"
            />
          </Link>
          <button onClick={() => setIsOpen(false)} className="w-1/5">
            <div className="w-full aspect-square flex justify-center items-center rounded-full transition hover:bg-gray-600 hover:text-gray-200">
              <PiSquaresFour className="text-xl" />
            </div>
          </button>
        </div>
        <div>
          {Object.keys(sideNavs).map((section) => (
            <div key={section} className="mt-2">
              <p className="text-sm font-bold mb-2">{section.toUpperCase()}</p>
              <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-600 hover:*:text-gray-200">
                {sideNavs[section as keyof typeof sideNavs].map((nav) => (
                  <Link
                    key={nav.title}
                    href={`/admin/${nav.title.toLowerCase()}`}
                    className={clsx(pathname === nav.title.toLowerCase() && "bg-gray-600 text-gray-200")}
                  >
                    <div className="inline-block mr-2 align-middle">{nav.icon}</div>
                    <span>{nav.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="*:block *:mb-2 *:px-4 *:py-3 *:rounded-xl *:cursor-pointer *:transition hover:*:bg-gray-600 hover:*:text-gray-200">
            <button onClick={() => logout()} className="w-full text-left">
              <CiLogout className="inline mr-2" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
