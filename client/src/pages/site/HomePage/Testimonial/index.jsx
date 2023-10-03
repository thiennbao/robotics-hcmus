import { useState } from "react";
import style from "./Testimonial.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const QuoteSlide = ({ quote }) => {
  return (
    <div>
      <i>{quote.content}</i>
      <p>
        <span>{quote.author}</span>
        <i className="bi bi-dot"></i>
        <span>{quote.position}</span>
      </p>
    </div>
  );
};

const quotes = [
  {
    content:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    author: "Lorem Lmao",
    position: "Clown",
  },
  {
    content:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    author: "Lorem Lmao",
    position: "Clown",
  },
  {
    content:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    author: "Lorem Lmao",
    position: "Clown",
  },
];

const Testimonial = () => {
  const [slide, setSlide] = useState(0);

  return (
    <Section wavy>
      <Appearance type="up">
        <Heading className="text-center" subcontent="What they say about us">
          Customer Testimonial
        </Heading>
      </Appearance>
      <div className={style.slideWrapper}>
        <Appearance type="down">
          <div
            style={{
              transform: `translateX(${(-slide * 100) / quotes.length}%)`,
              width: `${quotes.length * 100}%`,
            }}
          >
            {quotes.map((quote, index) => (
              <QuoteSlide key={index} quote={quote} />
            ))}
          </div>
        </Appearance>
        <div>
          {quotes.map((quote, index) => (
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

export default Testimonial;
