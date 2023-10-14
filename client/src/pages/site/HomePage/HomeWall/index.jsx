import { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./HomeWall.module.scss";
import Button from "components/Button";

import wallpaper1 from "assets/general/wallpaper-1.jpg";
import wallpaper2 from "assets/general/wallpaper-2.jpg";
import wallpaper3 from "assets/general/wallpaper-3.jpg";

const wallpapers = [wallpaper1, wallpaper2, wallpaper3];

const Background = () => {
  const [animatedWall, setAnimatedWall] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedWall(animatedWall + 1);
    }, 10000);
  }, [animatedWall]);

  return (
    <div
      key={animatedWall}
      className={style.wallpaper}
      style={{ backgroundImage: `url(${wallpapers[animatedWall % wallpapers.length]})` }}
    ></div>
  );
};

const HomeWall = () => {
  return (
    <section className={style.wall}>
      <Background />
      <div className="container position-absolute top-50 start-50 translate-middle text-center text-white">
        <p>VNUHCM - University of Science</p>
        <h1>Robotics & IoT</h1>
        <p className="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="row justify-content-center">
          <Button
            className={clsx(style.button, style.buttonLeft, "col-lg-3 col-md-4 col-sm-5 col-11 m-2")}
            to="/"
          >
            REGISTER NOW
          </Button>
          <Button
            className={clsx(style.button, style.buttonRight, "col-lg-3 col-md-4 col-sm-5 col-11 m-2")}
            variant="outline"
            to="/"
          >
            JOIN US
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeWall;
