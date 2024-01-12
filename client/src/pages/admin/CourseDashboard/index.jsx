import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "./courseSlice";
import AdminLayout from "layouts/AdminLayout";
import CourseEditor from "./CourseEditor";
import CourseList from "./CourseList";

const CourseDashboard = () => {
  const courses = useSelector((state) => state.course);

  // Get first 5 items
  const dispatch = useDispatch();
  useEffect(() => {
    if (!courses.length) {
      dispatch(getCourses({ skip: 0, limit: 5 }));
    }
  }, [courses.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="COURSE">
      {id === undefined ? (
        <CourseList pick={setId} />
      ) : (
        <CourseEditor id={id} goBack={() => setId(undefined)} />
      )}
    </AdminLayout>
  );
};

export default CourseDashboard;
