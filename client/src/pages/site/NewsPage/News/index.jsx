import style from "./News.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import { useEffect, useState } from "react";
import Button from "components/Button";
import Appearance from "components/Appearance";
import { newsAPI } from "api";
import { Link } from "react-router-dom";

const NewsItem = ({ news }) => {
  return (
    <div className={style.newsItem}>
      <Link to={`/news/${news._id}`}>
        <img src={news.thumbnail} alt={news.title} />
        <div>
          <h5>{news.title}</h5>
          <p>{new Date(news.updatedAt).toDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

const News = () => {
  const itemsInRow = window.innerWidth > 768 ? 3 : 2;

  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(2 * itemsInRow);

  useEffect(() => {
    newsAPI
      .getNews(0, limit)
      .then((res) => setNews(res.data))
      .catch((error) => console.log(error));
  }, [limit]);

  return (
    <Section className={style.news}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">NEWS</Heading>
        <div className="row g-4">
          {news.length &&
            news.map((item, index) => (
              <div key={item._id} className="col-lg-4 col-md-6">
                <Appearance type="up" animation={{ delay: `${(index % 3) * 0.1}s` }}>
                  <NewsItem news={item} />
                </Appearance>
              </div>
            ))}
        </div>
        <Appearance type="up">
          <Button
            variant="shadow"
            className={style.button}
            onClick={() => setLimit(limit + itemsInRow)}
          >
            Load more
          </Button>
        </Appearance>
      </div>
    </Section>
  );
};

export default News;
