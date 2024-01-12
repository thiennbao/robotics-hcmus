import { useDispatch } from "react-redux";
import { patchBlog, postBlog } from "../blogSlice";
import { useEffect, useState } from "react";
import { resourceApi } from "api";
import Editor, { HtmlField, ImageField, InputField, MultiImageField } from "components/Editor";

const BlogEditor = ({ id, goBack }) => {
  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id) {
      resourceApi
        .getSingleResource({ resource: "blog", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id) {
      // Edit
      dispatch(patchBlog({ id, data }));
    } else {
      // Create new
      dispatch(postBlog({ data }));
    }
    goBack();
  };
  const handleCancel = () => {
    goBack();
  };

  return (
    <Editor
      fields={[
        { type: InputField, name: "title", options: { required: true } },
        { type: ImageField, name: "thumbnail", options: { required: true } },
        { type: HtmlField, name: "content", options: { required: true } },
        { type: MultiImageField, name: "images" },
      ]}
      initData={data}
      save={handleSave}
      cancel={handleCancel}
    />
  );
};

export default BlogEditor;
