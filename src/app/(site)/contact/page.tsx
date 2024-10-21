import ContactForm from "@/components/partials/contactForm";
import ContactInfo from "@/components/partials/contactInfo";
import Faq from "@/components/partials/faq";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ | Robotics & IoT HCMUS",
  description:
    "Liên hệ câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
  openGraph: {
    title: "Liên hệ | Robotics & IoT HCMUS",
    description:
      "Liên hệ câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    type: "website",
    images: ["/wallpaper-contact.png"],
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageWall title="LIÊN HỆ" image="static/wallpaper-contact.png" />
      <ContactInfo className="py-16 lg:py-20" />
      <ContactForm />
      <Faq className="my-16 lg:my-20" />
    </main>
  );
}

export const dynamic = "force-dynamic";
