import { useEffect, useState } from "react";
import { courseAPI } from "api";
import Button from "components/Button";
import style from "./CourseList.module.scss";

const CourseList = ({ setEditCourse }) => {

  const [courses, setCourses] = useState([]) 

  useEffect(() => {
    courseAPI.getCourses().then((res) => setCourses(res.data))
  }, [])

  const removeHandle = (id) => {
    courseAPI.deleteCourse(id)
    setCourses(courses.filter((course) => course._id !== id))
  }

  return (
    <div className={style.courseList}>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Tuition</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>
                <img src={course.thumbnail} alt={course.name} />
              </td>
              <td>
                <span>{course.name}</span>
              </td>
              <td>
                <span>{course.tuition} $</span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setEditCourse(course._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => removeHandle(course._id)}>Remove</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
