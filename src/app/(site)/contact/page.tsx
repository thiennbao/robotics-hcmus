import ContactForm from "@/components/partials/contactForm";
import ContactInfo from "@/components/partials/contactInfo";
import Faq from "@/components/partials/faq";
import PageWall from "@/components/utils/pageWall";
import { getFile } from "@/lib/storage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Liên hệ | Robotics & IoT HCMUS",
    description:
      "Liên hệ câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
    openGraph: {
      title: "Liên hệ | Robotics & IoT HCMUS",
      description:
        "Liên hệ câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      type: "website",
      images: [await getFile("static/wallpaper-contact.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên hệ | Robotics & IoT HCMUS",
      description:
        "Liên hệ câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
      images: [await getFile("static/wallpaper-contact.png")],
    },
  };
}

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
