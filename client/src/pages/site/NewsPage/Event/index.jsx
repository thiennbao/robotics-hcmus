import { useEffect, useState } from "react";
import style from "./Event.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import { eventAPI } from "api";

const EventSlide = ({ content }) => {
  return (
    <iframe title="event" srcDoc={"<style>body{overflow: hidden; margin: 0;}</style>" + content}></iframe>
  );
};

const Event = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    eventAPI
      .getEvents()
      .then((res) => setEvents(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [slide, setSlide] = useState(0);

  return (
    <Section className={style.event}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">EVENT</Heading>
      </div>
      <div className={style.slideWrapper}>
        <div
          style={{
            transform: `translateX(${(-slide * 100) / events.length}%)`,
            width: `${events.length * 100}%`,
          }}
        >
          {events.map((event, index) => (
            <EventSlide key={index} content={event.content} />
          ))}
        </div>
        <div>
          {events.map((event, index) => (
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
    </Section>
  );
};

export default Event;
