import { resourceApi } from "api";
import Editor, { HtmlField, ImageField, InputField, MultiImageField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchBlog, postBlog } from "../blogSlice";

const BlogEditor = () => {
  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "blog", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postBlog({ data }));
    } else {
      dispatch(patchBlog({ id, data }));
    }
    navigate("/admin/blog");
  };

  return (
    <AdminLayout page="BLOG">
      <Editor
        fields={[
          { type: InputField, name: "title", options: { required: true } },
          { type: ImageField, name: "thumbnail", options: { required: true } },
          { type: HtmlField, name: "content", options: { required: true } },
          { type: MultiImageField, name: "images" },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
};

export default BlogEditor;
