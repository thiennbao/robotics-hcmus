import { useState } from "react";
import style from "./Event.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const NewsSlide = ({ news }) => {
  return <div className={style.newsSlide} dangerouslySetInnerHTML={{ __html: news }} />;
};

// Call API
const newsList = [
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh Event</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh Event</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
  `<div style="background-color: #f7f7f7; text-align: center"><h1>Bruh Event</h1><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p><p>HTML here HTML here HTME here</p></div>`,
];

const Event = () => {
  const [slide, setSlide] = useState(0);

  // Drag feature later

  return (
    <Section className={style.event}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">EVENT</Heading>
        <Appearance type="up">
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
      </div>
    </Section>
  );
};

export default Event;
