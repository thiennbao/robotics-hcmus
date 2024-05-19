import PageWall from "@/components/pageWall";
import ContactInfo from "./_components/contactInfo";
import ContactForm from "./_components/contactForm";
import Faq from "./_components/faq";

export default function ContactPage() {
  return (
    <main>
      <PageWall title="CONTACT" image="/picsum-4.png" />
      <ContactInfo className="min-h-screen flex py-24" />
      <ContactForm />
      <Faq className="min-h-screen flex py-24" />
    </main>
  );
}
