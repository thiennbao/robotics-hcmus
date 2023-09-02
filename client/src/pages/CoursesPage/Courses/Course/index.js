import style from "./Course.module.scss";

const Course = ({ image, title, description, yearOlds, classes, hours }) => {
  return (
    <div className={style.course}>
      <img src={image} alt="" />
      <div className="m-4">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="row">
          <p className="col-4">
            <span>{yearOlds}</span> Year olds
          </p>
          <p className="col-4">
            <span>{classes}</span> Classes
          </p>
          <p className="col-4">
            <span>{hours}</span> 1 Class
          </p>
        </div>
      </div>
    </div>
  );
};

export default Course;
