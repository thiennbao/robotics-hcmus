import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { blogApi } from "api";
import Appear from "components/Appear";
import Button from "components/Button";
import style from "./Blogs.module.scss";
import Loading from "components/Loading";

const Item = ({ blog }) => {
  return (
    <div className={style.item}>
      <Link to={`/blog/${blog._id}`}>
        <img src={blog.thumbnail} alt={blog.title} />
        <div>
          <h5>{blog.title}</h5>
          <p>{new Date(blog.updatedAt).toDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

const Blogs = () => {
  const navigate = useNavigate();
  const key = useLocation().search.split("=")[1];
  const itemsInRow = window.innerWidth > 768 ? 3 : 2;

  const [loaded, setLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(2 * itemsInRow);
  const [isOver, setIsOver] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    blogApi
      .getBlogs({ key, skip: 0, limit })
      .then((res) => {
        setBlogs(res.data);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
    blogApi
      .getBlogs({ key, skip: limit })
      .then((res) => setIsOver(!res.data.length))
      .catch((error) => console.log(error));
  }, [limit, key]);

  const searchHandle = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/blog/?key=${search}`);
    }
  };
  const clearHandle = () => {
    setSearch("");
    navigate("/blog");
  };

  return (
    <section className={style.blogs}>
      <div className="container">
        {key ? (
          <h2>
            <span>Search result for </span>
            <span>{key}</span>
            <i onClick={clearHandle} className="bi bi-x-circle-fill"></i>
          </h2>
        ) : (
          <h2>Archives</h2>
        )}
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
        {!blogs.length ? (
          <div className="d-flex justify-content-center">
            {loaded ? <div className="text-secondary">No result match with your search key</div> : <Loading />}
          </div>
        ) : (
          <>
            <div className="row g-4">
              {blogs.map((item, index) => (
                <div key={item._id} className="col-lg-4 col-md-6">
                  <Appear variant="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                    <Item blog={item} />
                  </Appear>
                </div>
              ))}
            </div>
            <Appear variant="up">
              {isOver ? (
                <div className="text-center text-secondary">You have seen all results</div>
              ) : (
                <Button
                  variant="outline"
                  className={style.button}
                  onClick={() => setLimit(limit + itemsInRow)}
                >
                  Load more
                </Button>
              )}
            </Appear>
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
