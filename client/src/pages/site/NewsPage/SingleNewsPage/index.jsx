import SiteLayout from "layouts/SiteLayout";
import style from "./SingleNewsPage.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { newsAPI } from "api";
import Wallpaper from "components/Wallpaper";
import FooterImages from "components/FooterImages";
import clsx from "clsx";
import Button from "components/Button";
import Heading from "components/Heading";

const SingleNewsPage = () => {
  const id = useLocation().pathname.split("/")[2];

  const [news, setNews] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    newsAPI
      .getOneNews(id)
      .then((res) => {
        setNews(res.data);
      })
      .catch((error) => console.log(error));
    newsAPI
      .getNews(0, 6)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const [search, setSearch] = useState("");

  return (
    <SiteLayout>
      {news.title ? (
        <>
          <Wallpaper page={news.title} image={news.thumbnail} />
          <section>
            <div className="container pb-5">
              <div className="row">
                <div className="col-xl-8">
                  <Heading subcontent={new Date(news.updatedAt).toDateString()}>
                    {news.title}
                  </Heading>
                  <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
                </div>
                <div className="col-xl-4">
                  <div className={style.searchBar}>
                    <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button to={`/news/search/?key=${search}`}>
                      <i className="bi bi-search"></i>
                    </Button>
                  </div>
                  <div className={clsx(style.postsWrapper, "container")}>
                    <div className="row">
                      <p className="fs-3">Latest Post</p>
                      {posts.map((post) => (
                        <div key={post._id} className="col-xl-12 col-md-6 col-12 container g-3">
                          <Link to={`/news/${post._id}`}>
                            <div className={clsx(style.post, "row")}>
                              <div className="col-4">
                                <img src={post.thumbnail} alt={post.title} />
                              </div>
                              <div className="col-8">
                                <p>{post.title}</p>
                                <p>{new Date(news.updatedAt).toDateString()}</p>
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
          <FooterImages />
        </>
      ) : (
        <section className={style.loading}>
          <h3>
            <span>Loading</span>
            <span className="spinner-border mx-3" role="status"></span>
          </h3>
        </section>
      )}
    </SiteLayout>
  );
};

export default SingleNewsPage;
