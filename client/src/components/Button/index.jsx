import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.scss";

const Button = ({ type, to, className, children }) => {
  return (
    <Link className={clsx(style.button, style[type] || style.fill, className)} to={to}>
      {children}
    </Link>
  );
};

export default Button;
