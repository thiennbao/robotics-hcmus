import { useState } from "react";
import style from "./HotNews.module.scss";
import Heading from "components/Heading";
import Button from "components/Button";

const NewsSlide = ({ news }) => {
  return <div className={style.newsSlide} dangerouslySetInnerHTML={{__html: news}} />;
};

// Call API
const newsList = [
  `<div style="background-color: tomato"><h1>Bruh News</h1><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p></div>`,
  `<div style="background-color: violet"><h1>Bruh News</h1><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p></div>`,
  `<div style="background-color: darkviolet"><h1>Bruh News</h1><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p><p>Lmao lmao lmao lmao lmao</p></div>`,
];

const HotNews = () => {
  const [slide, setSlide] = useState(0);

  return (
    <section>
      <div className="container">
        <Heading Tag="h2" extra subcontent="--- WELCOME TO">
          HOT NEWS
        </Heading>
        <div className={style.slideWrapper}>
          <div
            style={{
              transform: `translateX(${(-slide * 100) / newsList.length}%)`,
              width: `${newsList.length * 100}%`,
            }}
          >
            {newsList.map((news, index) => (
              <NewsSlide key={index} news={news} />
            ))}
          </div>
          <div>
            {newsList.map((news, index) => (
              <i
                key={index}
                onClick={() => setSlide(index)}
                className="bi bi-dash"
                style={{
                  transform: `scale(${index === slide ? 5 : 3}, 5)`,
                  color: index === slide ? "gray" : "lightgray",
                }}
              ></i>
            ))}
          </div>
        </div>
        <Button className={style.btn} type="shadow" to="/">
          See all news
        </Button>
      </div>
    </section>
  );
};

export default HotNews;
