import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.scss";

const Button = (props) => {
  const { variant = "fill", color, to, className, children, ...restProps } = props;
  return (
    <>
      {to ? (
        <Link className={clsx(style.button, style[variant], style[color], className)} to={to} {...restProps}>
          {children}
        </Link>
      ) : (
        <button className={clsx(style.button, style[variant], style[color], className)} {...restProps}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
