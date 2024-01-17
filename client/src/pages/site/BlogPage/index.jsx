import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import BlogArchive from "./BlogArchive";
import { wallpapers } from "assets";

const BlogPage = () => {
  return (
    <SiteLayout>
      <Wallpaper title="BLOGS" background={wallpapers[2]} />
      <BlogArchive />
    </SiteLayout>
  )
}

export default BlogPage