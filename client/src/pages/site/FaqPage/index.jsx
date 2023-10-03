import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Faq from "./Faq";
import FooterImages from "components/FooterImages";

const FaqPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="FAQ" />
      <Faq />
      <FooterImages />
    </SiteLayout>
  )
}

export default FaqPage