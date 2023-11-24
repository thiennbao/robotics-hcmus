import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import style from "./SingleBlog.module.scss";
import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import { blogApi } from "api";
import Button from "components/Button";

const SingleBlog = () => {
  const id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    blogApi
      .getSingleBlog({ id })
      .then((res) => {
        setBlog(res.data);
      })
      .catch(() => {
        navigate("/404");
      });
    blogApi
      .getBlogs({ skip: 0, limit: 5 })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [id, navigate]);

  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/blog/?key=${search}`);
    }
  };

  return (
    <SiteLayout>
      <Wallpaper title={blog.title} background={blog.thumbnail} />
      <section className={style.singleBlog}>
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <h2 subcontent={blog.updatedAt ? new Date(blog.updatedAt).toDateString() : ""}>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
            <div className="col-xl-4">
              <form onSubmit={searchHandle} className={style.searchBar}>
                <input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button className={style.searchBtn}>
                  <i className="bi bi-search"></i>
                </Button>
              </form>
              <div className={clsx(style.postsWrapper, "container")}>
                <div className="row">
                  <p className="fs-3">Latest Post</p>
                  {posts.map((post) => (
                    <div key={post._id} className="col-xl-12 col-md-6 col-12 container g-3">
                      <Link to={`/blog/${post._id}`}>
                        <div className={clsx(style.post, "row")}>
                          <div className="col-4">
                            <img src={post.thumbnail} alt={post.title} />
                          </div>
                          <div className="col-8">
                            <p>{post.title}</p>
                            <p>{new Date(blog.updatedAt).toDateString()}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default SingleBlog;
