import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../blogSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import { resourceApi } from "api";
import DataTable from "components/DataTable";

const BlogList = ({ pick }) => {
  const dispatch = useDispatch();
  const rawBlogs = useSelector((state) => state.blog);
  const blogs = rawBlogs.map((rawBlog) => {
    const blog = { ...rawBlog };
    blog.date = rawBlog.createdAt.split("T")[0];
    return blog;
  });

  const loadHandle = () => {
    dispatch(getBlogs({ skip: blogs.length, limit: 5 }));
  };

  const removeHandle = (id) => {
    if (window.confirm("Are you sure to delete this blog")) {
      resourceApi.getSingleResource({ resource: "blog", id }).then((res) => {
        const blog = res.data;
        // Delete item's images from firebase
        const thumbnailRef = ref(storage, blog.thumbnail);
        deleteObject(thumbnailRef);
        if (blog.images) {
          blog.images.forEach((image) => {
            if (image) {
              const imageRef = ref(storage, image);
              deleteObject(imageRef);
            }
          });
        }
        // Delete item
        dispatch(deleteBlog({ id }));
      });
    }
  };

  return (
    <DataTable
      fields={["thumbnail", "title", "date"]}
      data={blogs}
      pick={pick}
      remove={removeHandle}
      load={loadHandle}
    />
  );
};

export default BlogList;
