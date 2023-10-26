import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import News from "./News";
import FooterImages from "components/FooterImages";

const NewsPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="NEWS" />
      <News />
      <FooterImages />
    </SiteLayout>
  )
}

export default NewsPage