import style from "./Wall.module.scss";
import Wallpaper from "../Wallpaper";
import Button from "components/Button";

const Wall = () => {
  return (
    <section className={style.wall}>
      <Wallpaper />
      <div className={style.wallContent}>
        <p>VNUHCM - University of Science</p>
        <h1>Robotics & IoT</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
        <Button className={style.btn} type="fill" to="/">REGISTER NOW</Button>
      </div>
    </section>
  );
};

export default Wall