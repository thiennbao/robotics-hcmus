import { authApi, resourceApi } from "api";
import Editor, { InputField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchLink, postLink } from "../linkSlice";
import Loading from "components/Loading";

const LinkEditor = () => {
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
          navigate("/admin/link");
        }
      })
      .catch((errors) => {
        navigate("/admin/link");
        console.log(errors);
      });
  }, [navigate]);

  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "link", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postLink({ data }));
    } else {
      dispatch(patchLink({ id, data }));
    }
    navigate("/admin/link");
  };

  return isVerified ? (
    <AdminLayout page="LINK">
      <Editor
        fields={[
          { variant: InputField, name: "title", options: { required: true } },
          { variant: InputField, name: "content", options: { required: true } },
          {
            variant: InputField,
            name: "index",
            options: { required: true, min: 0 },
            type: "number",
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

export default LinkEditor;
