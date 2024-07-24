"use client";

import { Contact, Navigation } from "@prisma/client";
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

const Footer = ({ extraNav, contacts }: { extraNav: Navigation[]; contacts: Contact[] }) => {
  const page = usePathname().split("/")[1];

  const staticNav = [
    { title: "Home", address: "/" },
    { title: "About", address: "/about" },
    { title: "Courses", address: "/courses" },
    { title: "News", address: "/news" },
    { title: "Contact", address: "/contact" },
  ];

  contacts = contacts
    .filter((contact) => contact.title && contact.address)
    .sort((c1, c2) => (c2.title?.length || 0) - (c1.title?.length || 0));

  // Fixed with contacts list in db
  const icons: { [key: string]: JSX.Element } = {
    Location: <BsGeoAltFill />,
    Facebook: <BsFacebook />,
    Email: <BsEnvelopeFill />,
    Hotline: <BsTelephoneFill />,
  };

  return (
    <footer className="py-12 bg-gray-100">
      <div className="container lg:flex gap-16 *:flex-1 *:mb-8 *:lg:mb-0">
        {/* Logo */}
        <div>
          <Link href="/">
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
          <p className="mb-4 text-lg text-primary font-bold">Reach us at</p>
          <div className="*:block *:mb-2 *:transition hover:*:text-primary">
            {contacts.map((contact) => (
              <Link href={contact.address || ""} key={contact.key}>
                <div className="inline-block w-fit me-2 align-middle text-primary">
                  {icons[contact.key]}
                </div>
                <span>
                  {contact.key}: {contact.title}
                </span>
              </Link>
            ))}
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
