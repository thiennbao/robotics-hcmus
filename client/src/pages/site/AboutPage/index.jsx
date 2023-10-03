import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Description from "./Description";
import Quote from "./Quote";
import Team from "./Team";
import Special from "./Special";
import Gallery from "./Gallery";

const AboutPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="ABOUT US" />
      <Description full />
      <Special />
      <Quote />
      <Team />
      <Gallery />
    </SiteLayout>
  )
}

export default AboutPage