import { useDispatch, useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../courseSlice";
import Button from "components/Button";
import style from "./CourseList.module.scss";
import { useEffect } from "react";

const CourseList = ({ setId }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course);

  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      dispatch(deleteCourse(id));
    }
  };

  useEffect(() => {
    if (!courses.length) {
      dispatch(getCourses({ skip: 0, limit: 5 }));
    }
  }, [courses.length, dispatch]);

  return (
    <div className={style.courseList}>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Tuition</th>
            <th>
              <div className="d-flex justify-content-center">
                <Button variant="outline" onClick={() => setId(0)}>
                  Add New Course
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>
                <img src={course.thumbnail} alt="" />
              </td>
              <td>
                <span>{course.name}</span>
              </td>
              <td>
                <span>{course.tuition} $</span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" onClick={() => setId(course._id)}>
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => deleteHandle(course._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outline" className={style.loadButton} onClick={loadHandle}>
        Load more
      </Button>
    </div>
  );
};

export default CourseList;
