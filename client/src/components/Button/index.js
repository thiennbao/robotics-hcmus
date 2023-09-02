import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.scss";

const Button = ({type, to, className, children}) => {
  const btnType = style[type] || style.fill

  return (
    <Link className={clsx(style.button, btnType, className)} to={to}>{children}</Link>
  )
}

export default Button