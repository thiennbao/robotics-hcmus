import { resourceApi } from "api";
import style from "./Testimonial.module.scss";
import Appear from "components/Appear";
import SlideShow from "components/SlideShow";
import { useEffect, useState } from "react";

const Item = ({ content }) => {
  return (
    <div className={style.item}>
      <i>{content.content}</i>
      <div>
        <img draggable="false" src={content.image} alt="avatar" />
        <span>{content.name}</span>
        <i className="bi bi-dot"></i>
        <span>{content.position}</span>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "testimonial" })
      .then((res) => setTestimonials(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className={style.testimonial}>
      <div className={style.container}>
        <Appear variant="left">
          <h2>What they say about us</h2>
          <div className={style.slideShow}>
            <SlideShow contents={testimonials} ContentTag={Item} circles />
          </div>
        </Appear>
      </div>
    </section>
  );
};

export default Testimonial;
