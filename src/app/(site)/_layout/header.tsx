"use client";

import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsFacebook, BsTelephoneFill, BsEnvelopeFill, BsList, BsWechat } from "react-icons/bs";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { FaBook, FaNewspaper } from "react-icons/fa6";

const Header = () => {
  const pathname = usePathname();
  const [isOnTop, setIsOnTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsOnTop(latest === 0);
  });

  return (
    <header
      className={clsx(
        "fixed top-0 w-full font-bold transition-all duration-500 z-10",
        isOnTop
          ? "h-32 opacity-90 text-gray-200"
          : "h-20 shadow-[gray_0_0_2px] bg-gray-50 bg-opacity-95"
      )}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
        </div>
        {/* Navigations */}
        <nav className="hidden md:flex gap-4 lg:gap-8 *:px-2 *:py-1 *:relative *:*:py-4 *:*:transition after:*:*:transition-all after:*:*:absolute after:*:*:left-0 after:*:*:bottom-0 after:*:*:bg-primary after:*:*:h-[2px] after:*:*:w-0 hover:after:*:*:w-full">
          <div>
            <Link href="/about" className={clsx(pathname === "/about" && "text-primary")}>
              About
            </Link>
          </div>
          <div>
            <Link href="/courses" className={clsx(pathname === "/courses" && "text-primary")}>
              Courses
            </Link>
          </div>
          <div>
            <Link href="/news" className={clsx(pathname === "/news" && "text-primary")}>
              News
            </Link>
          </div>
          <div>
            <Link href="/contact" className={clsx(pathname === "/contact" && "text-primary")}>
              Contact
            </Link>
          </div>
        </nav>
        {/* Contacts */}
        <div className="hidden md:flex justify-center gap-8 *:transition hover:*:text-primary">
          <Link href="https://www.facebook.com/RoboticsHCMUS" target="blank">
            <BsFacebook />
          </Link>
          <Link href="tel:0366 399 748">
            <BsTelephoneFill />
          </Link>
          <Link href="mailto:robotics@hcmus.edu.vn">
            <BsEnvelopeFill />
          </Link>
        </div>
        {/* Mobile sidebar */}
        <div className="md:hidden flex items-center">
          {/* Toggle */}
          <input type="checkbox" id="sidebar" defaultChecked className="hidden peer" />
          <label htmlFor="sidebar">
            <BsList className="text-2xl cursor-pointer" />
          </label>
          {/* Overlay */}
          <label
            htmlFor="sidebar"
            className="peer-checked:hidden fixed top-0 left-0 w-full h-full bg-black opacity-80"
          />
          {/* Content */}
          <div className="fixed top-0 right-0 w-64 h-screen px-6 py-8 text-black text-sm bg-gray-200 bg-opacity-95 peer-checked:translate-x-full transition duration-500 *:mb-4">
            <div className="w-4/5 m-auto">
              <Link href="/admin">
                <img src="/logo.svg" alt="Logo" />
              </Link>
            </div>
            <div>
              <p className="font-bold mb-2">MENU</p>
              <div className="*:block *:mb-1 *:px-4 *:py-2 *:rounded-xl *:transition hover:*:bg-primary hover:*:text-gray-200">
                <Link href="/" className={clsx(pathname === "/" && "bg-primary text-gray-200")}>
                  <FaHome className="inline mr-2" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/about"
                  className={clsx(pathname === "/about" && "bg-primary text-gray-200")}
                >
                  <FaInfoCircle className="inline mr-2" />
                  <span>About</span>
                </Link>
                <Link
                  href="/courses"
                  className={clsx(pathname === "/courses" && "bg-primary text-gray-200")}
                >
                  <FaBook className="inline mr-2" />
                  <span>Courses</span>
                </Link>
                <Link
                  href="/news"
                  className={clsx(pathname === "/news" && "bg-primary text-gray-200")}
                >
                  <FaNewspaper className="inline mr-2" />
                  <span>News</span>
                </Link>
                <Link
                  href="/contact"
                  className={clsx(pathname === "/contact" && "bg-primary text-gray-200")}
                >
                  <BsWechat className="inline mr-2" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold mb-2">REACH US AT</p>
              <div className="*:block *:mb-1 *:px-4 *:py-2 *:rounded-xl *:transition hover:*:bg-primary hover:*:text-gray-200">
                <Link href="https://www.facebook.com/RoboticsHCMUS">
                  <BsFacebook className="inline mr-2" />
                  <span>Facebook</span>
                </Link>
                <Link href="tel:0366 399 748">
                  <BsTelephoneFill className="inline mr-2" />
                  <span>Phone</span>
                </Link>
                <Link href="mailto:robotics@hcmus.edu.vn">
                  <BsEnvelopeFill className="inline mr-2" />
                  <span>E-mail</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
