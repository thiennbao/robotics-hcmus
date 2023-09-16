import style from "./Background.module.scss";
import wallpaper1 from "assets/wallpaper-1.jpg";
import wallpaper2 from "assets/wallpaper-2.jpg";
import wallpaper3 from "assets/wallpaper-3.jpg";
import { useEffect, useState } from "react";

const wallpapers = [wallpaper1, wallpaper2, wallpaper3];

const Background = () => {
  const [wallAnimate, setWallAnimate] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWallAnimate(wallAnimate + 1);
    }, 10000);
  }, [wallAnimate]);

  return <div key={wallAnimate} className={style.wallpaper} style={{ backgroundImage: `url(${wallpapers[wallAnimate % wallpapers.length]})` }}></div>;
};

export default Background;
