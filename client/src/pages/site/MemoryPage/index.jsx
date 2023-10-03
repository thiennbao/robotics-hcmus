import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Timeline from "./Timeline";

const MemoryPage = () => {
  return (
    <SiteLayout>
      <Wallpaper page="MEMORY" />
      <Timeline />
    </SiteLayout>
  )
}

export default MemoryPage