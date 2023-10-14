import { useState } from "react";
import AdminLayout from "layouts/AdminLayout";
import CourseEditor from "./CourseEditor";
import CourseList from "./CourseList";

const CourseDashboard = () => {
  const [id, setId] = useState();

  return (
    <AdminLayout page="COURSE">
      {id === undefined ? <CourseList setId={setId} /> : <CourseEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default CourseDashboard;
