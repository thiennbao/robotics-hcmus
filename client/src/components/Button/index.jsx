import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Button.module.scss";

const Button = (props) => {
  const { type, to, className, children, ...restProps } = props;
  return (
    <>
      {to ? (
        <Link className={clsx(style.button, style[type] || style.fill, className)} to={to} {...restProps}>
          {children}
        </Link>
      ) : (
        <button type="button" className={clsx(style.button, style[type] || style.fill, className)} {...restProps}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
