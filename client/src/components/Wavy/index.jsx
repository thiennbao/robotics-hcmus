import style from "./Wavy.module.scss";

const Wavy = ({ children }) => {
  return (
    <>
      <div className={style.wavy}></div>
      <div>{children}</div>
    </>
  );
};

export default Wavy;
