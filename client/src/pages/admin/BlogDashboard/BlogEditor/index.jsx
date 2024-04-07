import { authApi, resourceApi } from "api";
import Editor, { HtmlField, ImageField, InputField, MultiImageField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchBlog, postBlog } from "../blogSlice";
import Loading from "components/Loading";

const BlogEditor = () => {
  const navigate = useNavigate();

  // Verify auth
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { role } = res.data.decoded;
        if (role === "root" || role === "admin") {
          setIsVerified(true);
        } else {
          navigate("/admin/blog");
        }
      })
      .catch((errors) => {
        navigate("/admin/blog");
        console.log(errors);
      });
  }, [navigate]);

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
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postBlog({ data }));
    } else {
      dispatch(patchBlog({ id, data }));
    }
    navigate("/admin/blog");
  };

  return isVerified ? (
    <AdminLayout page="BLOG">
      <Editor
        fields={[
          { variant: InputField, name: "title", options: { required: true } },
          { variant: ImageField, name: "thumbnail", options: { required: true } },
          { variant: HtmlField, name: "content", options: { required: true } },
          { variant: MultiImageField, name: "images" },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  ) : (
    <Loading fullscreen />
  );
};

export default BlogEditor;
