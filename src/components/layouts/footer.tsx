"use client";

import { Contact, Navigation } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsHeartFill } from "react-icons/bs";

const Footer = ({ extraNav, contacts }: { extraNav: Navigation[]; contacts: Contact[] }) => {
  const page = usePathname().split("/")[1];

  const staticNav = [
    { title: "Trang chủ", address: "/" },
    { title: "Giới thiệu", address: "/about" },
    { title: "Khóa học", address: "/courses" },
    { title: "Tin tức", address: "/news" },
    { title: "Liên hệ", address: "/contact" },
  ];

  contacts = contacts.sort((c1, c2) => (c2.title?.length || 0) - (c1.title?.length || 0));

  return (
    <footer className="py-12 bg-gray-100">
      <div className="container lg:flex gap-16 *:flex-1 *:mb-8 *:lg:mb-0">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="Robotics and IoT HCMUS" width={160} height={100} />
          </Link>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
        </div>
        {/* Navigations */}
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Menu</p>
          <div className="flex flex-wrap">
            {[...staticNav, ...extraNav].map((navigation) => (
              <Link
                href={navigation.address}
                key={navigation.title}
                className={clsx(
                  "w-1/2 mb-2 transition hover:text-primary",
                  `/${page}` === navigation.address && "text-primary font-bold"
                )}
              >
                {navigation.title}
              </Link>
            ))}
          </div>
        </div>
        {/* Contacts */}
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Thông tin liên hệ</p>
          <div className="*:block *:mb-2 *:transition hover:*:text-primary">
            {contacts.map((contact) => (
              <Link href={contact.address || ""} key={contact.key} target="_blank">
                {contact.key}: {contact.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
