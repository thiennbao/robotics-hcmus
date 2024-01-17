import { resourceApi } from "api";
import Editor, { InputField, TextField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactEditor = () => {
  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    resourceApi
      .getSingleResource({ resource: "contact", id })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  // Form handler
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/admin/contact");
  };

  return (
    <AdminLayout page="CONTACT">
      <Editor
        fields={[
          { type: InputField, name: "subject", readOnly: true },
          { type: InputField, name: "name", readOnly: true },
          { type: InputField, name: "phone", readOnly: true },
          { type: InputField, name: "email", readOnly: true },
          { type: TextField, name: "message", readOnly: true },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
};

export default ContactEditor;
