import { useEffect, useState } from "react";
import style from "./HomeWall.module.scss";
import { resourceApi } from "api";
import SlideShow from "components/SlideShow";
import Loading from "components/Loading";

const Item = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content.content }}></div>;
};

const HomeWall = () => {
  const [banners, setBanners] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    resourceApi
      .getResources({ resource: "banner", sort: "index" })
      .then((res) => {
        setBanners(res.data);
        setLoaded(true);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section className={style.wall}>
      {!banners.length ? (
        <>
          {error || loaded ? (
            <div className="position-absolute top-50 start-50 translate-middle text-secondary">{error}</div>
          ) : (
            <div className={style.loadingScreen}>
              <div>
                <Loading />
              </div>
            </div>
          )}
        </>
      ) : (
        <SlideShow contents={banners} ContentTag={Item} prevnext />
      )}
    </section>
  );
};

export default HomeWall;
