import { resourceApi } from "api";
import Editor, { HtmlField, InputField, MultiImageField } from "components/Editor";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { patchBanner, postBanner } from "../bannerSlice";

const BannerEditor = () => {
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
  const navigate = useNavigate();
  const handleSave = (data) => {
    if (id === "add") {
      dispatch(postBanner({ data }));
    } else {
      dispatch(patchBanner({ id, data }));
    }
    navigate("/admin/banner");
  };

  return (
    <AdminLayout page="BANNER">
      <Editor
        fields={[
          { variant: InputField, name: "name", options: { required: true } },
          { variant: HtmlField, name: "content", options: { required: true } },
          { variant: MultiImageField, name: "images" },
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
  );
};

export default BannerEditor;
