import { resourceApi } from "api";
import Editor, { ImageField, InputField, MultiImageField, TextField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchCourse, postCourse } from "../courseSlice";

const CourseEditor = () => {
  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "course", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postCourse({ data }));
    } else {
      dispatch(patchCourse({ id, data }));
    }
    navigate("/admin/course");
  };

  return (
    <AdminLayout page="COURSE">
      <Editor
        fields={[
          { type: InputField, name: "name", options: { required: true } },
          { type: ImageField, name: "thumbnail", options: { required: true } },
          { type: InputField, name: "tuition", options: { required: true } },
          { type: TextField, name: "description", options: { required: true } },
          { type: InputField, name: "age", options: { required: true } },
          { type: InputField, name: "lesson", options: { required: true } },
          { type: InputField, name: "time", options: { required: true } },
          { type: MultiImageField, name: "images" },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
};

export default CourseEditor;
