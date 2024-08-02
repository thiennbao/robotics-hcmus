import ContactForm from "@/components/partials/contactForm";
import ContactInfo from "@/components/partials/contactInfo";
import Faq from "@/components/partials/faq";
import PageWall from "@/components/utils/pageWall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Robotics & IoT HCMUS",
  description:
    "Contact Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
  openGraph: {
    title: "Contact | Robotics & IoT HCMUS",
    description:
      "Contact Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM",
    type: "website",
    images: ["/wallpaper-contact.png"],
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageWall title="CONTACT" image="/wallpaper-contact.png" />
      <ContactInfo className="min-h-screen flex py-24" />
      <ContactForm />
      <Faq className="min-h-screen flex py-24" />
    </main>
  );
}

export const dynamic = "force-dynamic";
