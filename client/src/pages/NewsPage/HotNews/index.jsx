import { useState } from "react";
import style from "./HotNews.module.scss";
import Section from "layouts/partials/Section";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";

const NewsSlide = ({ news }) => {
  return <div className={style.newsSlide} dangerouslySetInnerHTML={{ __html: news }} />;
};

// Call API
const newsList = [
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh News</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh News</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh News</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
];

const HotNews = () => {
  const [slide, setSlide] = useState(0);

  // Drag feature later

  return (
    <Section className={style.hotnews}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">HOT NEWS</Heading>
        <Appearance type="left">
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
        </Appearance>
        <Appearance type="right">
          <Button className={style.button} type="shadow" to="/news">
            See all news
          </Button>
        </Appearance>
      </div>
    </Section>
  );
};

export default HotNews;
