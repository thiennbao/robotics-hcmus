import style from "./News.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import { useEffect, useState } from "react";
import Button from "components/Button";
import Appearance from "components/Appearance";

const NewsItem = ({ news }) => {
  return (
    <div className={style.newsItem}>
      <img src={news.image} alt={news.title} />
      <div>
        <h5>{news.title}</h5>
        <p>{news.date.toDateString()}</p>
      </div>
    </div>
  );
};

const News = () => {
  const itemsInRow = window.innerWidth > 768 ? 3 : 2;

  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(2 * itemsInRow);

  useEffect(() => {
    // Call API bla bla
    const fetchNews = [];
    for (let i = 0; i < limit; i++) {
      fetchNews.push({
        image: "https://i.kym-cdn.com/photos/images/newsfeed/002/580/908/add",
        title: "でも そんなんじゃ だめ もう そんなんじゃ ほら 心は進化するよ もっともっと",
        date: new Date(),
      });
    }

    setNews(fetchNews);
  }, [limit]);

  return (
    <Section className={style.news}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">NEWS</Heading>
        <div className={style.search}>
          <p>Search bar here Search bar here Search bar here Search bar here</p>
          <p>Waiting for backend Waiting for backend Waiting for backend Waiting for backend</p>
        </div>
        <div className="row g-4">
          {/* Key need changing to item.id later */}
          {news.length &&
            news.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <Appearance type="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                  <NewsItem news={item} />
                </Appearance>
              </div>
            ))}
        </div>
        <Appearance type="up">
          <Button variant="shadow" className={style.button} onClick={() => setLimit(limit + itemsInRow)}>
            Load more
          </Button>
        </Appearance>
      </div>
    </Section>
  );
};

export default News;
