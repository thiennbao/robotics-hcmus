import { authApi, resourceApi } from "api";
import Editor, { InputField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchContactInfo, postContactInfo } from "../contactInfoSlice";
import Loading from "components/Loading";

const ContactInfoEditor = () => {
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
          navigate("/admin/contactInfo");
        }
      })
      .catch((errors) => {
        navigate("/admin/contactInfo");
        console.log(errors);
      });
  }, [navigate]);

  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "contactInfo", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postContactInfo({ data }));
    } else {
      dispatch(patchContactInfo({ id, data }));
    }
    navigate("/admin/contactInfo");
  };

  return isVerified ? (
    <AdminLayout page="CONTACT INFOMATION">
      <Editor
        fields={[
          { variant: InputField, name: "key", options: { required: true } },
          { variant: InputField, name: "icon", options: { required: true } },
          { variant: InputField, name: "title", options: { required: true } },
          { variant: InputField, name: "content", options: { required: true } },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  ) : (
    <Loading fullscreen />
  );
};

export default ContactInfoEditor;
