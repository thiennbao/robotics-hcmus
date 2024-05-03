"use client";

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
    <footer className="bg-gradient-to-b from-[#020820] to-bg_primary text-slate-300 py-12">
      <div className="container lg:flex gap-16 *:flex-1 *:mb-8 *:lg:mb-0">
        <div>
          <Link href="#">
            <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Quick links</p>
          <ul className="flex flex-wrap *:w-1/2 *:mb-2 *:transition">
            <li>
              <Link
                href="/"
                className={`hover:text-primary transition ${
                  pathname === "/" ? "text-primary font-bold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`hover:text-primary transition ${
                  pathname === "/about" ? "text-primary font-bold" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`hover:text-primary transition ${
                  pathname === "/courses" ? "text-primary font-bold" : ""
                }`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`hover:text-primary transition ${
                  pathname === "/blogs" ? "text-primary font-bold" : ""
                }`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-primary transition ${
                  pathname === "/contact" ? "text-primary font-bold" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Reach us at</p>
          <ul className="*:mb-2">
            <li>
              <Link
                href="https://maps.app.goo.gl/zg6WypHivDsz9hzH9"
                className="hover:text-primary transition"
              >
                <BsGeoAltFill className="inline me-2 text-primary" />
                <span>
                  Location: Robotics & IoT Lab, Room No.86, University of Science, 227 Nguyen Van
                  Cu, Phuong 4, Quan 5, Tp HCM
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/RoboticsHCMUS"
                className="hover:text-primary transition"
              >
                <BsFacebook className="inline me-2 text-primary" />
                <span>Facebook: Robotics & IoT HCMUS</span>
              </Link>
            </li>
            <li>
              <Link href="mailto:robotics@hcmus.edu.vn" className="hover:text-primary transition">
                <BsEnvelopeFill className="inline me-2 text-primary" />
                <span>Email: robotics@hcmus.edu.vn</span>
              </Link>
            </li>
            <li>
              <Link href="tel:(028) 38 325 929" className="hover:text-primary transition">
                <BsTelephoneFill className="inline me-2 text-primary" />
                <span>Phone: (028) 38 325 929</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container text-center mt-8">
        <p>
          This website is made with <BsHeartFill className="inline mx-2 text-2xl text-red-500" /> by
          Robotics & IoT HCMUS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
