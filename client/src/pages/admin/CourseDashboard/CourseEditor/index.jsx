import { resourceApi } from "api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { patchCourse, postCourse } from "../courseSlice";
import Editor, { ImageField, InputField, MultiImageField, TextField } from "components/Editor";

const CourseEditor = ({ id, goBack }) => {
  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id) {
      resourceApi
        .getSingleResource({ resource: "course", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id) {
      // Edit
      dispatch(patchCourse({ id, data }));
    } else {
      // Create new
      dispatch(postCourse({ data }));
    }
    goBack();
  };
  const handleCancel = () => {
    goBack();
  };

  return (
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
      initData={data}
      save={handleSave}
      cancel={handleCancel}
    />
  );
};

export default CourseEditor;
