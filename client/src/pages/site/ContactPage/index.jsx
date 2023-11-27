import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Faq from "./Faq";
import { wallpapers } from "assets";

const ContactPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="CONTACT" background={wallpapers[3]} />
      <ContactInfo />
      <ContactForm />
      <Faq />
    </SiteLayout>
  );
};

export default ContactPage;
