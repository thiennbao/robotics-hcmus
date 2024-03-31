import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import style from "./BlogDetail.module.scss";
import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import { resourceApi } from "api";
import Button from "components/Button";
import Appear from "components/Appear";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    resourceApi
      .getSingleResource({ resource: "blog", id })
      .then((res) => setBlog(res.data))
      .catch(() => navigate("/404"));
    resourceApi
      .getResources({ resource: "blog", sort: "createdAt", order: "desc", skip: 0, limit: 5 })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [id, navigate]);

  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/blogs/?key=${search}`);
    }
  };

  return (
    <SiteLayout>
      <Wallpaper title={blog.title} background={blog.thumbnail} />
      <section className={style.blogDetail}>
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <h2 subcontent={blog.updatedAt ? new Date(blog.updatedAt).toDateString() : ""}>
                {blog.title}
              </h2>
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
                  <Appear variant="up">
                    <p className="fs-3">Latest Post</p>
                  </Appear>
                  {posts.map((post) => (
                    <div key={post._id} className="col-xl-12 col-md-6 col-12 container g-3">
                      <Appear variant="left">
                        <Link to={`/blogs/${post._id}`}>
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
                      </Appear>
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

export default BlogDetail;
