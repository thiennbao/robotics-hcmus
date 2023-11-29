import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resourceApi } from "api";
import style from "./BlogArchive.module.scss";
import Blog from "../Blog";
import Appear from "components/Appear";
import Button from "components/Button";
import Loading from "components/Loading";

const BlogArchive = () => {
  const navigate = useNavigate();
  const key = useLocation().search.split("=")[1];
  const itemsInRow = window.innerWidth > 768 ? 3 : 2;

  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(2 * itemsInRow);
  const [isOver, setIsOver] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    resourceApi
      .getResources({
        resource: "blog",
        where: "title",
        key,
        sort: "createdAt",
        order: "desc",
        limit,
      })
      .then((res) => {
        setBlogs(res.data);
        setLoaded(true);
      })
      .catch((error) => setError(error.message));
    resourceApi
      .getResources({ resource: "blog", where: "title", key, skip: limit })
      .then((res) => setIsOver(!res.data.length))
      .catch((error) => setError(error.message));
  }, [limit, key]);

  const searchHandle = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/blogs/?key=${search}`);
    }
  };
  const clearHandle = () => {
    setSearch("");
    navigate("/blogs");
  };

  return (
    <section className={style.blogArchive}>
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
            {error || loaded ? (
              <div className="text-secondary">
                {error || "No result match with your search key"}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        ) : (
          <>
            <div className="row g-4">
              {blogs.map((item, index) => (
                <div key={item._id} className="col-lg-4 col-md-6">
                  <Appear variant="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                    <Blog content={item} />
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

export default BlogArchive;
