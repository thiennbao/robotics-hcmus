import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../blogSlice";
import { authApi, resourceApi } from "api";
import DataTable from "components/DataTable";
import { storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Button from "components/Button";

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
      try {
        const { data } = await resourceApi.getSingleResource({ resource: "blog", id });
        // Delete item's images from firebase
        deleteObject(ref(storage, data.thumbnail));
        data.images.forEach((image) => deleteObject(ref(storage, image)));
        // Delete item
        dispatch(deleteBlog({ id }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Backup data
  const [downloadUrl, setDownloadUrl] = useState();
  useEffect(() => {
    resourceApi
      .getResources({ resource: "blog" })
      .then((res) => {
        const { data } = res;
        const bytes = new TextEncoder().encode(JSON.stringify(data));
        const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleImport = (e) => {
    // Read uploaded file
    const file = e.target.files[0];
    const readFile = (file, callback) => {
      const reader = new FileReader();
      reader.onload = () => callback(reader.result);
      reader.readAsText(file);
    };
    readFile(file, (res) => {
      // Call api
      const data = JSON.parse(res);
      data.forEach((item) => {
        resourceApi
          .postResource({ resource: "blog", data: item })
          .then(() => dispatch(getBlogs({ skip: 0, limit: 5 })))
          .catch((error) => console.log(error));
      });
    });
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
      <div className="d-flex justify-content-center my-5">
        <Button variant="outline" onClick={loadHandle} className="px-4 py-2 mx-2">
          Load more
        </Button>
        <Button variant="outline" color="green" className="mx-2">
          <a href={downloadUrl} download="blog.json" className="px-4 py-2" style={{ color: "inherit" }}>
            Download data
          </a>
        </Button>
        <Button variant="outline" color="red" className="mx-2">
          <label htmlFor="import" className="px-4 py-2">
            Import data
          </label>
          <input type="file" id="import" className="d-none" onInput={handleImport} />
        </Button>
      </div>
    </AdminLayout>
  );
};

export default BlogList;
