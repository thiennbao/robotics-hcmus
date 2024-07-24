import ContactForm from "@/components/partials/contactForm";
import ContactInfo from "@/components/partials/contactInfo";
import Faq from "@/components/partials/faq";
import PageWall from "@/components/utils/pageWall";

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
