"use client";

import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const page = usePathname().split("/")[1];

  const { scrollY } = useScroll();
  const [isOnTop, setIsOnTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsOnTop(latest === 0);
  });

  const navItems = [
    { title: "Giới thiệu", address: "/about" },
    { title: "Khóa học", address: "/courses" },
    { title: "Tin tức", address: "/news" },
    { title: "Cuộc thi", address: "/competitions" },
    { title: "Liên hệ", address: "/contact" },
  ];

  return (
    <header
      className={clsx(
        "w-full fixed z-10 font-bold transition-all duration-500",
        isOnTop ? "h-32" : "h-20 shadow-[gray_0_0_2px] bg-gray-50"
      )}
    >
      <div className={clsx("h-full container flex items-center justify-between", isOnTop && "opacity-90 text-white")}>
        <div className="max-w-48">
          <Link href="/">
            <Image
              src={isOnTop ? "/logo-white.png" : "/logo-primary.png"}
              alt="Robotics and IoT HCMUS"
              width={800}
              height={200}
              className="h-full w-full"
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-4 lg:gap-8">
          {navItems.map((item) => (
            <div
              key={item.title}
              className={clsx(
                "px-2 py-1 relative after:absolute after:left-0 after:bottom-0 after:bg-primary after:h-[2px] after:w-0 hover:after:w-full after:transition-all *:py-4",
                `/${page}` === item.address && "text-primary"
              )}
            >
              <Link href={item.address}>{item.title}</Link>
            </div>
          ))}
        </nav>
        <div className="md:hidden">
          <IoMenu onClick={() => setIsOpen(true)} className="text-2xl cursor-pointer" />
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <div
          onClick={() => setIsOpen(false)}
          className={clsx(!isOpen && "hidden", "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-95 z-20")}
        />
        <div
          className={clsx(
            !isOpen && "translate-x-full",
            "fixed top-0 right-0 w-64 h-screen p-6 bg-gray-50 text-sm transition duration-500 z-20 *:mb-4"
          )}
        >
          <div className="flex p-2 justify-between gap-4">
            <Link href="/admin" className="w-4/5">
              <Image src="/logo-primary.png" alt="Robotics and IoT HCMUS" width={160} height={100} />
            </Link>
            <button onClick={() => setIsOpen(false)} className="w-1/5">
              <div className="w-full aspect-square flex justify-center items-center rounded-full">
                <IoMenu className="text-xl" />
              </div>
            </button>
          </div>
          <div>
            <p className="text-sm font-bold mb-4">MENU</p>
            <div className="*:block *:mb-2 *:py-2 *:border-b *:border-gray-200 hover:*:text-primary hover:*:border-primary">
              {[{ title: "Trang chủ", address: "/" }, ...navItems].map((item) => (
                <Link key={item.title} href={item.address}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
