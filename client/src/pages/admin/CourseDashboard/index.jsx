import { useState } from "react";
import AdminLayout from "layouts/AdminLayout";
import CourseEditor from "./CourseEditor";
import CourseList from "./CourseList";

const CourseDashboard = () => {
  const [editCourse, setEditCourse] = useState();

  return (
    <AdminLayout page="COURSE">
      {editCourse ? (
        <CourseEditor editCourse={editCourse} setEditCourse={setEditCourse} />
      ) : (
        <CourseList setEditCourse={setEditCourse} />
      )}
    </AdminLayout>
  );
};

export default CourseDashboard;
