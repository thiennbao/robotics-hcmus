import { useDispatch, useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../courseSlice";
import { courseAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import style from "./CourseList.module.scss";
import Button from "components/Button";

const CourseList = ({ setId }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course);

  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      courseAPI.getCourse(id).then((res) => {
        res.data.images &&
          res.data.images.forEach((image) => {
            const currentRef = ref(storage, image);
            deleteObject(currentRef);
          });
        dispatch(deleteCourse(id));
      });
    }
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
