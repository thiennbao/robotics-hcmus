"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BsFacebook,
  BsTelephoneFill,
  BsEnvelopeFill,
  BsList,
  BsInfoCircleFill,
} from "react-icons/bs";
import { FaHome, FaNewspaper } from "react-icons/fa";
import { GiChatBubble, GiSpellBook } from "react-icons/gi";

const Header = () => {
  const pathname = usePathname();
  const [isOnTop, setIsOnTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsOnTop(latest === 0);
  });

  return (
    <header
      className={`fixed top-0 w-full font-bold text-slate-300 transition-all duration-500 z-10 ${
        isOnTop ? "h-32 opacity-90" : "h-20 shadow-[white_0_0_1px] bg-bg-primary bg-opacity-95"
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-4 lg:gap-8">
            <li className="px-2 py-1 relative">
              <Link
                href="/about"
                className={`transition after:transition-all py-4 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full ${
                  pathname === "/about" ? "text-primary" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li className="px-2 py-1 relative">
              <Link
                href="/courses"
                className={`transition after:transition-all py-4 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full ${
                  pathname === "/courses" ? "text-primary" : ""
                }`}
              >
                Courses
              </Link>
            </li>
            <li className="px-2 py-1 relative">
              <Link
                href="/news"
                className={`transition after:transition-all py-4 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full ${
                  pathname === "/news" ? "text-primary" : ""
                }`}
              >
                News
              </Link>
            </li>
            <li className="px-2 py-1 relative">
              <Link
                href="/contact"
                className={`transition after:transition-all py-4 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full ${
                  pathname === "/contact" ? "text-primary" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block">
          <ul className="flex justify-center gap-8">
            <li>
              <Link
                href="https://www.facebook.com/RoboticsHCMUS"
                target="blank"
                className="hover:text-primary transition"
              >
                <BsFacebook />
              </Link>
            </li>
            <li>
              <Link href="tel:0366 399 748" className="hover:text-primary transition">
                <BsTelephoneFill />
              </Link>
            </li>
            <li>
              <Link href="mailto:robotics@hcmus.edu.vn" className="hover:text-primary transition">
                <BsEnvelopeFill />
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden flex items-center">
          {/* Mobile sidemenu */}
          <input type="checkbox" id="side-menu" defaultChecked className="peer hidden" />
          <label htmlFor="side-menu">
            {/* Toggle menu */}
            <BsList className="text-2xl cursor-pointer" />
          </label>
          <label
            htmlFor="side-menu"
            className="peer-checked:hidden fixed top-0 left-0 w-full h-full bg-black opacity-80"
          />
          <div className="peer-checked:translate-x-full transition duration-500 fixed top-0 right-0 h-screen p-8 bg-bg_primary bg-opacity-95 shadow-[white_0_0_1px]">
            <div className="px-4 sm:px-8">
              <Link href="/">
                <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
              </Link>
            </div>
            <nav className="my-8">
              <p className="text-lg text-primary mb-2">Menu</p>
              <ul className="*:py-2 *:flex *:items-center">
                <li>
                  <FaHome className="me-2 text-primary" />
                  <Link href="/" className={`${pathname === "/" ? "text-primary" : ""}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <BsInfoCircleFill className="me-2 text-primary" />
                  <Link href="/about" className={`${pathname === "/about" ? "text-primary" : ""}`}>
                    About
                  </Link>
                </li>
                <li>
                  <GiSpellBook className="me-2 text-primary" />
                  <Link
                    href="/courses"
                    className={`${pathname === "/courses" ? "text-primary" : ""}`}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <FaNewspaper className="me-2 text-primary" />
                  <Link href="/news" className={`${pathname === "/news" ? "text-primary" : ""}`}>
                    News
                  </Link>
                </li>
                <li>
                  <GiChatBubble className="me-2 text-primary" />
                  <Link
                    href="/contact"
                    className={`${pathname === "/contact" ? "text-primary" : ""}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-8">
              <p className="text-lg text-primary mb-2">Reach us at</p>
              <ul className="flex gap-6 *:py-2">
                <li>
                  <Link href="https://www.facebook.com/RoboticsHCMUS" target="blank">
                    <BsFacebook />
                  </Link>
                </li>
                <li>
                  <Link href="tel:0366 399 748">
                    <BsTelephoneFill />
                  </Link>
                </li>
                <li>
                  <Link href="mailto:robotics@hcmus.edu.vn">
                    <BsEnvelopeFill />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
