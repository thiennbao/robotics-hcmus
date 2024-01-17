import { authApi } from "api";
import Editor, { InputField, PasswordField, SelectField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, register } from "../accountSlice";

const AccountEditor = () => {
  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      authApi
        .getAccountInfo({ id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(register({ data }));
    } else {
      data = { currentPassword: data["current password"], password: data["new password"] };
      dispatch(changePassword({ id, data }));
    }
    navigate("/admin/account");
  };

  return (
    <AdminLayout page="ACCOUNT">
      <Editor
        fields={[
          {
            variant: InputField,
            name: "username",
            options: { required: true },
            disabled: id !== "add",
          },
          {
            variant: SelectField,
            name: "role",
            options: { required: true },
            select: [
              { title: "Manager", value: 0 },
              { title: "Administrator", value: 1 },
            ],
            disabled: id !== "add",
          },
          {
            ...(id === "add"
              ? {}
              : { variant: PasswordField, name: "current password", options: { required: true } }),
          },
          {
            variant: PasswordField,
            name: id === "add" ? "password" : "new password",
            options: { required: true, minLength: 8, maxLength: 32 },
            confirm: true,
          },
        ]}
        data={data}
        handleSave={handleSave}
      />
    </AdminLayout>
  );
};

export default AccountEditor;
