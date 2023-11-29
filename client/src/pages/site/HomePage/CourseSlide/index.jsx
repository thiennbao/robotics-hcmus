import { useEffect, useState } from "react";
import { resourceApi } from "api";
import style from "./CourseSlide.module.scss";
import Loading from "components/Loading";
import Course from "pages/site/CoursePage/Course";
import SlideShow from "components/SlideShow";

const Item = ({ content }) => {
  return (
    <div className="p-2">
      <Course content={content} />
    </div>
  );
};

const CourseSlide = () => {
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    resourceApi
      .getResources({ resource: "course" })
      .then((res) => {
        setCourses(res.data);
        setLoaded(true);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section className={style.courseSlide}>
      <div className="container">
        <h2>Course at Robotics and IoT</h2>
        {!courses.length ? (
          <div className="d-flex justify-content-center">
            {error || loaded ? <div className="text-secondary">{error}</div> : <Loading />}
          </div>
        ) : (
          <div className="overflow-hidden">
            <SlideShow
              contents={courses}
              ContentTag={Item}
              itemsPerScreen={window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1}
              prevnext
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSlide;
