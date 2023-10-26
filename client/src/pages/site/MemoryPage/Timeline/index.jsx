import Heading from "components/Heading";
import style from "./Timeline.module.scss";
import Section from "components/Section";
import Appearance from "components/Appearance";
import { timelineAPI } from "api";
import { useEffect, useState } from "react";

const Item = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div className={style.time}>
        <h4>{new Date(data.date).toDateString()}</h4>
      </div>
      <div>
        <h3>{data.title}</h3>
        <p>{data.content}</p>
        <div className="row g-2">
          {data.images.map((image, index) => (
            <div key={index} className="col-xl-3 col-lg-6 col-md-3 col-6">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [timelines, setTimelines] = useState([]);
  useEffect(() => {
    timelineAPI
      .getTimelines()
      .then((res) => setTimelines(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Section>
      <Heading className="text-center" subcontent="Pellentesque fames at dui eu justo">
        Timeline malesuada elementum
      </Heading>
      <div className={style.timeline}>
        <ul>
          {timelines.map((item, index) => (
            <li key={index}>
              <Appearance type={index % 2 || window.innerWidth <= 992 ? "left" : "right"}>
                <Item data={item} />
              </Appearance>
            </li>
          ))}
          <div style={{ clear: "both" }}></div>
        </ul>
      </div>
    </Section>
  );
};

export default Timeline;
