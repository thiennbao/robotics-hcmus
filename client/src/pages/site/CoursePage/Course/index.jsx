import style from "./Course.module.scss";
import Button from "components/Button";

const Course = ({ content }) => {
  return (
    <div className={style.course}>
      <img src={content.thumbnail} alt="" />
      <div>
        <div>
          <h5>{content.name}</h5>
          <p className="text-secondary mb-4">{content.description.slice(0, 200)}...</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className={style.tuition}>{content.tuition}</p>
          <Button to={`/courses/${content._id}`} variant="outline" className={style.detailBtn}>
            See details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Course;
