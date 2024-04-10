import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import BlogArchive from "./BlogArchive";
import { wallpaper_blogs } from "assets";

const BlogPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="BLOGS" background={wallpaper_blogs} />
      <BlogArchive />
    </SiteLayout>
  )
}

export default BlogPage