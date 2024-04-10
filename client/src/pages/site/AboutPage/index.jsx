import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Description from "./Description";
import Feature from "./Feature";
import Quote from "./Quote";
import Testimonial from "./Testimonial";
import { wallpaper_about } from "assets";

const AboutPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="ABOUT US" background={wallpaper_about} />
      <Description />
      <Quote />
      <Feature />
      <Testimonial />
    </SiteLayout>
  )
}

export default AboutPage