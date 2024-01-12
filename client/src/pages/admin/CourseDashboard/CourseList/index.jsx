import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getCourses } from "../courseSlice";
import { resourceApi } from "api";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";

const CourseList = ({ pick }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course);

  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };

  const removeHandle = (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      resourceApi.getSingleResource({ resource: "course", id }).then((res) => {
        const course = res.data;
        // Delete item's images from firebase
        const thumbnailRef = ref(storage, course.thumbnail);
        deleteObject(thumbnailRef);
        if (course.images) {
          course.images.forEach((image) => {
            if (image) {
              const imageRef = ref(storage, image);
              deleteObject(imageRef);
            }
          });
        }
        // Delete item
        dispatch(deleteCourse({ id }));
      });
    }
  };

  return (
    <DataTable
      fields={["thumbnail", "name", "tuition"]}
      data={courses}
      pick={pick}
      remove={removeHandle}
      load={loadHandle}
    />
  );
};

export default CourseList;
