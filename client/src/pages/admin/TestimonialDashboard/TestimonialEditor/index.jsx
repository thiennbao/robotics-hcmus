import { authApi, resourceApi } from "api";
import Editor, { ImageField, InputField, TextField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchTestimonial, postTestimonial } from "../testimonialSlice";
import Loading from "components/Loading";

const TestimonialEditor = () => {
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
          navigate("/admin/testimonial");
        }
      })
      .catch((errors) => {
        navigate("/admin/testimonial");
        console.log(errors);
      });
  }, [navigate]);

  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "testimonial", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postTestimonial({ data }));
    } else {
      dispatch(patchTestimonial({ id, data }));
    }
    navigate("/admin/testimonial");
  };

  return isVerified ? (
    <AdminLayout page="BANNER">
      <Editor
        fields={[
          { variant: ImageField, name: "image", options: { required: true } },
          { variant: InputField, name: "name", options: { required: true } },
          { variant: InputField, name: "position", options: { required: true } },
          { variant: TextField, name: "content", options: { required: true } },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  ) : (
    <Loading fullscreen />
  );
};

export default TestimonialEditor;
