"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsEnvelopeFill,
  BsFacebook,
  BsGeoAltFill,
  BsHeartFill,
  BsTelephoneFill,
} from "react-icons/bs";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="py-12 bg-gray-100">
      <div className="container lg:flex gap-16 *:flex-1 *:mb-8 *:lg:mb-0">
        {/* Logo */}
        <div>
          <Link href="#">
            <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
        </div>
        {/* Navigations */}
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Quick links</p>
          <div className="flex flex-wrap *:w-1/2 *:mb-2 *:transition hover:*:text-primary">
            <Link href="/" className={clsx(pathname === "/" && "text-primary font-bold")}>
              Home
            </Link>
            <Link href="/about" className={clsx(pathname === "/about" && "text-primary font-bold")}>
              About
            </Link>
            <Link
              href="/courses"
              className={clsx(pathname === "/courses" && "text-primary font-bold")}
            >
              Courses
            </Link>
            <Link href="/news" className={clsx(pathname === "/news" && "text-primary font-bold")}>
              News
            </Link>
            <Link
              href="/contact"
              className={clsx(pathname === "/contact" && "text-primary font-bold")}
            >
              Contact
            </Link>
          </div>
        </div>
        {/* Contacts */}
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Reach us at</p>
          <div className="*:block *:mb-2 *:transition hover:*:text-primary">
            <Link href="https://maps.app.goo.gl/zg6WypHivDsz9hzH9">
              <BsGeoAltFill className="inline me-2 text-primary" />
              <span>
                Location: Robotics & IoT Lab, Room No.86, University of Science, 227 Nguyen Van Cu,
                Phuong 4, Quan 5, Tp HCM
              </span>
            </Link>
            <Link href="https://www.facebook.com/RoboticsHCMUS">
              <BsFacebook className="inline me-2 text-primary" />
              <span>Facebook: Robotics & IoT HCMUS</span>
            </Link>
            <Link href="mailto:robotics@hcmus.edu.vn">
              <BsEnvelopeFill className="inline me-2 text-primary" />
              <span>Email: robotics@hcmus.edu.vn</span>
            </Link>
            <Link href="tel:(028) 38 325 929">
              <BsTelephoneFill className="inline me-2 text-primary" />
              <span>Phone: (028) 38 325 929</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container text-center mt-8">
        <p>
          <span>This website is made with</span>
          <BsHeartFill className="inline mx-2 text-2xl text-red-500" />
          <span>by Robotics & IoT HCMUS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
