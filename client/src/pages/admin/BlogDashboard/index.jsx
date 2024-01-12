import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "./blogSlice";
import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import BlogEditor from "./BlogEditor";
import AdminLayout from "layouts/AdminLayout";

const BlogDashboard = () => {
  const blogs = useSelector((state) => state.blog);

  // Get first 5 items
  const dispatch = useDispatch();
  useEffect(() => {
    if (!blogs.length) {
      dispatch(getBlogs({ skip: 0, limit: 5 }));
    }
  }, [blogs.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="BLOG">
      {id === undefined ? (
        <BlogList pick={setId} />
      ) : (
        <BlogEditor id={id} goBack={() => setId(undefined)} />
      )}
    </AdminLayout>
  );
};

export default BlogDashboard;
