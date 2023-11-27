import { useEffect, useState } from "react";
import { blogApi } from "api";
import style from "./BlogSlide.module.scss";
import Loading from "components/Loading";
import Blog from "pages/site/BlogPage/Blog";
import SlideShow from "components/SlideShow";

const Item = ({ content }) => {
  return (
    <div className="p-2">
      <Blog content={content} />
    </div>
  );
};

const BlogSlide = () => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    blogApi
      .getBlogs({ limit: 5 })
      .then((res) => {
        setBlogs(res.data);
        setLoaded(true);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section className={style.blogSlide}>
      <div className="container">
        <h2>News and Blogs</h2>
        {!blogs.length ? (
          <div className="d-flex justify-content-center">
            {error || loaded ? <div className="text-secondary">{error}</div> : <Loading />}
          </div>
        ) : (
          <div className="overflow-hidden">
            <SlideShow
              contents={blogs}
              ContentTag={Item}
              itemsPerScreen={window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1}
              prevnext
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSlide;
