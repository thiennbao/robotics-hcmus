import { logo_min } from "assets";
import style from "./Loading.module.scss";

const Loading = ({ fullscreen }) => {
  return fullscreen ? (
    <div className={style.wrapper}>
      <div className={style.loading}>
        <div></div>
        <img src={logo_min} alt="loading..." />
      </div>
    </div>
  ) : (
    <div className={style.loading}>
      <div></div>
      <img src={logo_min} alt="loading..." />
    </div>
  );
};

export default Loading;
