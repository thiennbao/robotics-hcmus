import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.scss";

const Button = ({ variant = "fill", color, to, className, children, ...rest }) => {
  return (
    <>
      {to ? (
        <Link
          className={clsx(style.button, style[variant], style[color], className)}
          to={to}
          {...rest}
        >
          {children}
        </Link>
      ) : (
        <button className={clsx(style.button, style[variant], style[color], className)} {...rest}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
