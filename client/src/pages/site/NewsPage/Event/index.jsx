import { useState } from "react";
import style from "./Event.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const EventSlide = ({ event }) => {
  return <div className={style.eventSlide} dangerouslySetInnerHTML={{ __html: event }} />;
};

// Call API
const eventList = [
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
                transform: `translateX(${(-slide * 100) / eventList.length}%)`,
                width: `${eventList.length * 100}%`,
              }}
            >
              {eventList.map((event, index) => (
                <EventSlide key={index} event={event} />
              ))}
            </div>
            <div>
              {eventList.map((event, index) => (
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
