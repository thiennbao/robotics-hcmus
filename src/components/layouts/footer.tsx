"use client";
import { Contact } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = ({ contacts }: { contacts: Contact[] }) => {
  const page = usePathname().split("/")[1];

  const navItems = [
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
        <div>
          <Link href="/">
            <Image
              src="/logo-primary.png"
              alt="Robotics and IoT HCMUS"
              className="mb-4 max-w-48"
              width={800}
              height={200}
            />
          </Link>
          <div className="flex flex-wrap *:w-1/2 *:mb-2 *:transition hover:*:text-primary">
            {navItems.map((item) => (
              <Link
                href={item.address}
                key={item.title}
                className={clsx(`/${page}` === item.address && "text-primary font-bold")}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg text-primary font-bold">Thông tin liên hệ</p>
          <div className="*:block *:mb-2 *:transition hover:*:text-primary">
            {contacts.map((contact) => (
              <Link href={contact.address} key={contact.title} target="_blank">
                {contact.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141718!2d106.67990747460313!3d10.76284085944506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1696159391564!5m2!1svi!2s"
            className="w-full h-full aspect-video rounded-lg"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
