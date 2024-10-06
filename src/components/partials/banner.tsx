"use client";

import { Banner as BannerModel } from "@prisma/client";
import Image from "next/image";

const Banner = ({ banner }: { banner: BannerModel }) => {
  return (
    <Image
      key={banner.name}
      src={window.innerWidth > 640 ? banner.desktopImg : banner.mobileImg}
      alt={banner.name}
      width={1600}
      height={900}
      className="h-full w-full object-cover brightness-50"
    />
  );
};

export default Banner;
