import { useDispatch, useSelector } from "react-redux";
import { getCourses, deleteCourse } from "../courseSlice";
import { courseAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const CourseList = ({ setId }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course);

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      courseAPI.getCourse(id).then((res) => {
        const currentRef = ref(storage, res.data.thumbnail);
        deleteObject(currentRef);
        res.data.images &&
          res.data.images.forEach((image) => {
            const currentRef = ref(storage, image);
            deleteObject(currentRef);
          });
        dispatch(deleteCourse(id));
      });
    }
  };
  const loadHandle = () => {
    dispatch(getCourses({ skip: courses.length, limit: 5 }));
  };

  return (
    <DataTable
      fields={["thumbnail", "name", "tuition"]}
      data={courses}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default CourseList;
