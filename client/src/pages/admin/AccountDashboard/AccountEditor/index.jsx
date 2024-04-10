import { authApi } from "api";
import Editor, { InputField, PasswordField, SelectField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, register } from "../accountSlice";
import Loading from "components/Loading";

const AccountEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Verify auth
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { _id, role } = res.data.decoded;
        if (_id === id || role === "root") {
          setIsVerified(true);
        } else {
          navigate("/admin/account");
        }
      })
      .catch((errors) => {
        navigate("/admin/account");
        console.log(errors);
      });
  }, [navigate, id]);

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
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(register({ data }));
    } else {
      data = { currentPassword: data["current password"], password: data["new password"] };
      dispatch(changePassword({ id, data }));
    }
    navigate("/admin/account");
  };

  return isVerified ? (
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
              { title: "Root", value: "root" },
              { title: "Manager", value: "manager" },
              { title: "Administrator", value: "admin" },
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
  ) : (
    <Loading fullscreen />
  );
};

export default AccountEditor;
