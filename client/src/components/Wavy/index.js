import style from "./Wavy.module.scss";
import wavySvg from "assets/background/wavy.svg";

const Wavy = ({ no, direct }) => {
  return <div className={style.wavy} style={{ backgroundImage: `url(${wavySvg})` }}></div>;
};

export default Wavy;
