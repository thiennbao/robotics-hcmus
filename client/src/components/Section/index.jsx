import style from "./Section.module.scss";

const Section = (props) => {
  const {wavy, children, ...restProps} = props

  return (
    <section {...restProps}>
      {wavy && <div className={style.wavy}></div>}
      <div>{children}</div>
    </section>
  );
};

export default Section;
