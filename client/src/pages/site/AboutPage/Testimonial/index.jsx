import style from "./Testimonial.module.scss";
import { customers } from "assets";
import Appear from "components/Appear";
import SlideShow from "components/SlideShow";

const contents = [
  {
    quote:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    avatar: customers[0],
    author: "Totoro",
    position: "Customer",
  },
  {
    quote:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    avatar: customers[1],
    author: "Little totoro",
    position: "Customer",
  },
  {
    quote:
      "Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.",
    avatar: customers[2],
    author: "Catbus",
    position: "Customer",
  },
];

const Item = ({ content }) => {
  return (
    <div className={style.item}>
      <i>{content.quote}</i>
      <div>
        <img draggable="false" src={content.avatar} alt="avatar" />
        <span>{content.author}</span>
        <i className="bi bi-dot"></i>
        <span>{content.position}</span>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className={style.testimonial}>
      <div className={style.container}>
        <Appear variant="left">
          <h2>What they say about us</h2>
          <div className={style.slideShow}>
            <SlideShow contents={contents} ContentTag={Item} circles />
          </div>
        </Appear>
      </div>
    </section>
  );
};

export default Testimonial;
