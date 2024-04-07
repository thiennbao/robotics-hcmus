import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../blogSlice";
import { authApi, resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const BlogList = () => {
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

  const rawBlogs = useSelector((state) => state.blog);
  const blogs = rawBlogs.map((rawBlog) => ({ date: rawBlog.createdAt.split("T")[0], ...rawBlog }));

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(getBlogs({ skip: 0, limit: 5 }));
    }
  }, [blogs, dispatch]);

  const loadHandle = () => {
    dispatch(getBlogs({ skip: blogs.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this blog")) {
      const { data } = await resourceApi.getSingleResource({ resource: "blog", id });
      // Delete item's images from firebase
      deleteObject(ref(storage, data.thumbnail));
      data.images.forEach((image) => deleteObject(ref(storage, image)));
      // Delete item
      dispatch(deleteBlog({ id }));
    }
  };

  return (
    <AdminLayout page="BLOG">
      <DataTable
        fields={["thumbnail", "title", "date"]}
        data={blogs}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
    </AdminLayout>
  );
};

export default BlogList;
