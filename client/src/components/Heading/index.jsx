import clsx from "clsx";
import style from "./Heading.module.scss";

const Heading = (props) => {
  const { className, children, ...restProps } = props;
  return (
    <h2 className={clsx(style.heading, className)} {...restProps}>
      {children}
    </h2>
  );
};

export default Heading;
