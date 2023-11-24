import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import { wallpapers } from "assets";
import Blogs from "./Blogs";

const BlogPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="BLOGS" background={wallpapers[1]} />
      <Blogs />
    </SiteLayout>
  )
}

export default BlogPage