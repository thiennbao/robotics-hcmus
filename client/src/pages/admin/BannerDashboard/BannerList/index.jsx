import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanners } from "../bannerSlice";
import { resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";

const BannerList = () => {
  const dispatch = useDispatch();

  const banners = useSelector((state) => state.banner);

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
      data.images.forEach((image) => deleteObject(ref(storage, image)));
      // Delete item
      dispatch(deleteBanner({ id }));
    }
  };

  return (
    <AdminLayout page="BANNER">
      <DataTable
        fields={["name", "index"]}
        data={banners}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
      />
    </AdminLayout>
  );
};

export default BannerList;
