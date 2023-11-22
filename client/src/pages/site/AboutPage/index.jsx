import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Description from "./Description";
import Feature from "./Feature";
import Quote from "./Quote";
import Testimonial from "./Testimonial";
import { wallpapers } from "assets";

const AboutPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="ABOUT US" background={wallpapers[0]} />
      <Description />
      <Quote />
      <Feature />
      <Testimonial />
    </SiteLayout>
  )
}

export default AboutPage