import { useEffect, useState } from "react";
import { resourceApi } from "api";
import Loading from "components/Loading";
import Appear from "components/Appear";
import style from "./CourseArchive.module.scss";
import Course from "../Course";

const CourseArchive = () => {
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
    <section className={style.courseArchive}>
      <div className="container">
        <h2>Courses</h2>
        {!courses.length ? (
          <div className="d-flex justify-content-center">
            {error || loaded ? <div className="text-secondary">{error}</div> : <Loading />}
          </div>
        ) : (
          <div className="row g-4">
            {courses.map((item, index) => (
              <div key={item._id} className="col-lg-4 col-md-6">
                <Appear variant="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                  <Course content={item} />
                </Appear>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseArchive;
