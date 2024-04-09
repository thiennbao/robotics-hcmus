import { authApi, resourceApi } from "api";
import Editor, { InputField, TextField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchFaq, postFaq } from "../faqSlice";
import Loading from "components/Loading";

const FaqEditor = () => {
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
          navigate("/admin/faq");
        }
      })
      .catch((errors) => {
        navigate("/admin/faq");
        console.log(errors);
      });
  }, [navigate]);

  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "faq", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postFaq({ data }));
    } else {
      dispatch(patchFaq({ id, data }));
    }
    navigate("/admin/faq");
  };

  return isVerified ? (
    <AdminLayout page="BANNER">
      <Editor
        fields={[
          { variant: InputField, name: "question", options: { required: true } },
          { variant: TextField, name: "answer", options: { required: true } },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  ) : (
    <Loading fullscreen />
  );
};

export default FaqEditor;
