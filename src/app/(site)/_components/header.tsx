"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Header shrink when scroll down
  const [isOnTop, setIsOnTop] = useState(true);
  useEffect(() => {
    const detectOnTop = () => setIsOnTop(window.scrollY === 0);
    window.addEventListener("scroll", detectOnTop);
    // Clear event when header change state
    return () => window.removeEventListener("scroll", detectOnTop);
  }, [isOnTop]);

  return (
    <header
      className={`fixed top-0 w-full font-bold text-slate-300 transition-all duration-500 ${
        isOnTop ? "h-36 opacity-90" : "h-20 shadow-[white_0_0_1px] bg-bg_primary bg-opacity-95"
      }`}
    >
      <div className="container h-full flex items-center justify-between">
        <aside>
          <Link href="/">
            <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
        </aside>
        <nav className="hidden md:block">
          <ul className="flex gap-8 lg:gap-12">
            <li>
              <Link
                href="/about"
                className={`hover:text-primary transition py-4 ${
                  pathname === "/about" ? "text-primary" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`hover:text-primary transition py-4 ${
                  pathname === "/courses" ? "text-primary" : ""
                }`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`hover:text-primary transition py-4 ${
                  pathname === "/blogs" ? "text-primary" : ""
                }`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-primary transition py-4 ${
                  pathname === "/contact" ? "text-primary" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <aside className="hidden md:block">
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
        </aside>
        <aside className="md:hidden flex items-center">
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
                  <Link href="/blogs" className={`${pathname === "/blogs" ? "text-primary" : ""}`}>
                    Blogs
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
        </aside>
      </div>
    </header>
  );
};

export default Header;
