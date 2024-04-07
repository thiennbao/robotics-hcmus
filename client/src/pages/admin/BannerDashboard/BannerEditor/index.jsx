import { authApi, resourceApi } from "api";
import Editor, { ImageField, InputField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchBanner, postBanner } from "../bannerSlice";
import Loading from "components/Loading";

const BannerEditor = () => {
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
          navigate("/admin/banner");
        }
      })
      .catch((errors) => {
        navigate("/admin/banner");
        console.log(errors);
      });
  }, [navigate]);

  const { id } = useParams();

  const [data, setData] = useState(id === "add" ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id !== "add") {
      resourceApi
        .getSingleResource({ resource: "banner", id })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Form handler
  const dispatch = useDispatch();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postBanner({ data }));
    } else {
      dispatch(patchBanner({ id, data }));
    }
    navigate("/admin/banner");
  };

  return isVerified ? (
    <AdminLayout page="BANNER">
      <Editor
        fields={[
          { variant: ImageField, name: "image", options: { required: true } },
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

export default BannerEditor;
