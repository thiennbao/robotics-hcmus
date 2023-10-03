import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import ApplyForm from "./ApplyForm";
import FooterImages from "components/FooterImages";

const JoinUsPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="JOIN US" />
      <ApplyForm />
      <FooterImages />
    </SiteLayout>
  )
}

export default JoinUsPage