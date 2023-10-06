import { useDispatch, useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../courseSlice";
import Button from "components/Button";
import style from "./CourseList.module.scss";

const CourseList = ({ setId }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course);

  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteCourse(id));
  };

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
                <Button type="outline" onClick={() => setId(0)}>
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
                  <Button type="outline" onClick={() => setId(course._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(course._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="outline" className={style.loadButton} onClick={loadHandle}>Load more</Button>
    </div>
  );
};

export default CourseList;
