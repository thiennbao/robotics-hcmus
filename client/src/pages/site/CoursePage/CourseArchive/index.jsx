import { useEffect, useState } from "react";
import { resourceApi } from "api";
import Loading from "components/Loading";
import Appear from "components/Appear";
import style from "./CourseArchive.module.scss";
import Course from "../Course";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button";

const CourseArchive = () => {
  const navigate = useNavigate();
  const key = useLocation().search.split("=")[1];
  const itemsInRow = window.innerWidth > 768 ? 3 : 2;

  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(2 * itemsInRow);
  const [isOver, setIsOver] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    resourceApi
      .getResources({
        resource: "course",
        where: "name",
        key,
        sort: "createdAt",
        order: "desc",
        limit,
      })
      .then((res) => {
        setCourses(res.data);
        setLoaded(true);
      })
      .catch((error) => setError(error.message));
    resourceApi
      .getResources({ resource: "course", where: "name", key, skip: limit })
      .then((res) => setIsOver(!res.data.length))
      .catch((error) => setError(error.message));
  }, [limit, key]);

  const searchHandle = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/courses?key=${search}`);
    }
  };
  const clearHandle = () => {
    setSearch("");
    navigate("/courses");
  };

  return (
    <section className={style.courseArchive}>
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
        {!courses.length ? (
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
            <div className="row g-4 mb-5">
              {courses.map((item, index) => (
                <div key={item._id} className="col-lg-4 col-md-6 d-flex">
                  <Appear variant="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                    <Course content={item} />
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

export default CourseArchive;
