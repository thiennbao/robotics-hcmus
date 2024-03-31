import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getCourses } from "../courseSlice";
import { resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";

const CourseList = () => {
  const dispatch = useDispatch();

  const rawCourses = useSelector((state) => state.course);
  const courses = rawCourses.map((rawCourse) => ({ date: rawCourse.createdAt.split("T")[0], ...rawCourse }));

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getCourses({ skip: 0, limit: 5 }));
    }
  }, [courses, dispatch]);

  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      const { data } = await resourceApi.getSingleResource({ resource: "course", id });
      // Delete item's images from firebase
      deleteObject(ref(storage, data.thumbnail));
      data.images.forEach((image) => deleteObject(ref(storage, image)));
      // Delete item
      dispatch(deleteCourse({ id }));
    }
  };

  return (
    <AdminLayout page="COURSE">
      <DataTable
        fields={["thumbnail", "name", "date"]}
        data={courses}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
      />
    </AdminLayout>
  );
};

export default CourseList;
