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
          { variant: InputField, name: "name", options: { required: true } },
          { variant: ImageField, name: "thumbnail", options: { required: true } },
          { variant: TextField, name: "description", options: { required: true } },
          { variant: TextField, name: "aim", options: { required: true } },
          { variant: InputField, name: "requirement", options: { required: true } },
          { variant: InputField, name: "age", options: { required: true } },
          { variant: InputField, name: "lesson", options: { required: true } },
          { variant: InputField, name: "duration", options: { required: true } },
          { variant: MultiImageField, name: "images" },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
};

export default CourseEditor;
