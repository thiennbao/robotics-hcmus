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
  useEffect(() => {
    resourceApi
      .getResources({ resource: "banner", sort: "index" })
      .then((res) => setBanners(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className={style.wall}>
      {banners.length ? (
        <SlideShow contents={banners} ContentTag={Item} prevnext />
      ) : (
        <div className={style.loadingScreen}>
          <div>
            <Loading />
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeWall;
