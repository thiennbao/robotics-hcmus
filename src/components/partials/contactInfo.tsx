import { HTMLAttributes } from "react";
import Appear from "../utils/appear";
import db from "@/lib/db";
import Link from "next/link";

const ContactInfo = async (props: HTMLAttributes<HTMLDivElement>) => {
  const contacts = await db.contact.findMany({ orderBy: { order: "asc" } });

  return (
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div className="lg:mr-20">
            <Appear variant="right">
              <h2 className="mb-8 text-3xl text-primary font-bold">THÔNG TIN LIÊN HỆ</h2>
              {contacts.map((contact) => (
                <Link
                  key={contact.title}
                  href={contact.address}
                  className="block my-6 hover:text-primary transition"
                  target="_blank"
                >
                  {contact.title}
                </Link>
              ))}
            </Appear>
          </div>
        </div>
        <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
          <Appear variant="left" className="w-full h-full">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141718!2d106.67990747460313!3d10.76284085944506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1696159391564!5m2!1svi!2s"
              className="w-full h-full rounded-lg aspect-video"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
