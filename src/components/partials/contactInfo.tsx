import { HTMLAttributes } from "react";
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsTelephoneFill } from "react-icons/bs";
import Appear from "../utils/appear";
import db from "@/lib/db";
import Link from "next/link";

const ContactInfo = async (props: HTMLAttributes<HTMLDivElement>) => {
  const contacts = (await db.contact.findMany())
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
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div className="lg:mr-20">
            <h2 className="mb-8 text-3xl font-bold before:content-['COURSE_DETAILS'] before:block before:text-primary before:text-[0.6em] before:font-normal">
              Contact Information
            </h2>
            {contacts.map((contact) => (
              <Appear key={contact.key} variant="right" className="flex items-center gap-6 my-6">
                <Link href={contact.address || ""} className="hover:text-primary transition">
                  <div className="inline-block w-fit me-2 align-middle text-2xl text-primary">
                    {icons[contact.key]}
                  </div>
                  <span>
                    {contact.key}: {contact.title}
                  </span>
                </Link>
              </Appear>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
          <Appear variant="left" className="w-full h-full">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141718!2d106.67990747460313!3d10.76284085944506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1696159391564!5m2!1svi!2s"
              className="w-full h-full rounded-lg"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
