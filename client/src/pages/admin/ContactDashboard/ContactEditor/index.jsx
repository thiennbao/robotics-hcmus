import { useEffect, useState } from "react";
import { resourceApi } from "api";
import Editor, { InputField, TextField } from "components/Editor";

const ContactEditor = ({ id, goBack }) => {
  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id) {
      resourceApi
        .getSingleResource({ resource: "contact", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const handleCancel = () => {
    goBack();
  };

  return (
    <Editor
      fields={[
        { type: InputField, name: "subject", readonly: true },
        { type: InputField, name: "name", readonly: true },
        { type: InputField, name: "phone", readonly: true },
        { type: InputField, name: "email", readonly: true },
        { type: TextField, name: "message", readonly: true },
      ]}
      initData={data}
      save={handleCancel}
      cancel={handleCancel}
    />
  );
};

export default ContactEditor;
