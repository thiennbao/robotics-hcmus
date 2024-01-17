import { useEffect, useState } from "react";
import style from "./HomeWall.module.scss";
import { resourceApi } from "api";
import SlideShow from "components/SlideShow";

const Item = ({ content }) => {
  return <iframe title="content" srcDoc={content.content} className={style.item}></iframe>;
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
      <SlideShow contents={banners} ContentTag={Item} prevnext />
    </section>
  );
};

export default HomeWall;
