import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanners } from "../bannerSlice";
import { authApi, resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const BannerList = () => {
  // Verify auth
  const [actionDisable, setActionDisable] = useState(true);
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { role } = res.data.decoded;
        if (role === "root" || role === "admin") {
          setActionDisable(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const dispatch = useDispatch();

  const rawBanners = useSelector((state) => state.banner);
  const banners = rawBanners.map((rawBanner) => ({ date: rawBanner.createdAt.split("T")[0], ...rawBanner }));

  useEffect(() => {
    if (banners.length === 0) {
      dispatch(getBanners({ skip: 0, limit: 5 }));
    }
  }, [banners, dispatch]);

  const loadHandle = () => {
    dispatch(getBanners({ skip: banners.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this banner")) {
      const { data } = await resourceApi.getSingleResource({ resource: "banner", id });
      // Delete item's images from firebase
      deleteObject(ref(storage, data.image));
      // Delete item
      dispatch(deleteBanner({ id }));
    }
  };

  return (
    <AdminLayout page="BANNER">
      <DataTable
        fields={["image", "index", "date"]}
        data={banners}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
    </AdminLayout>
  );
};

export default BannerList;
