import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "layouts/partials/Wallpaper";
import Event from "./Event";
import News from "./News";
import FooterImages from "components/FooterImages";

const NewsPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="NEWS" />
      <Event />
      <News />
      <FooterImages />
    </SiteLayout>
  )
}

export default NewsPage