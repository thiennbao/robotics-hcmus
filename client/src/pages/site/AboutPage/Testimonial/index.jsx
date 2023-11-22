import { useState, useEffect, useRef } from "react";
import style from "./Testimonial.module.scss";
import { customers } from "assets";

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

const Testimonial = () => {
  const ref = useRef();

  const [slide, setSlide] = useState(0);
  const [dragging, setDragging] = useState(0);

  useEffect(() => {
    if (dragging) {
      const handleDrag = (e) => {
        ref.current.style.transform = `translateX(${
          -slide * window.innerWidth + e.clientX - dragging
        }px)`;
      };
      window.addEventListener("mousemove", handleDrag);
      const handleDrop = (e) => {
        if (e.clientX - dragging > 100) {
          setSlide(slide === 0 ? slide : slide - 1);
        } else if (e.clientX - dragging < -100) {
          setSlide(slide === contents.length - 1 ? slide : slide + 1);
        }
        setDragging(0);
      };
      window.addEventListener("mouseup", handleDrop);

      return () => {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("mouseup", handleDrop);
      };
    }
  }, [dragging, slide]);

  if (ref.current) {
    ref.current.style.transform = `translateX(${(-slide * 100) / contents.length}%)`;
    ref.current.style.cursor = dragging ? "grabbing" : "grab";
  }

  return (
    <section className={style.testimonial}>
      <div className={style.container}>
        <h2>What they say about us</h2>
        <div
          ref={ref}
          onMouseDown={(e) => setDragging(e.clientX)}
          className={style.wrapper}
          style={{ width: `${contents.length * 100}%` }}
        >
          {contents.map((item, index) => (
            <div key={index} style={{ width: `${100 / contents.length}%` }} className={style.item}>
              <i>{item.quote}</i>
              <div>
                <img draggable="false" src={item.avatar} alt="avatar" />
                <span>{item.author}</span>
                <i className="bi bi-dot"></i>
                <span>{item.position}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={style.control}>
          {contents.map((item, index) => (
            <i
              key={index}
              className={`bi bi-${index === slide ? "circle-fill" : "circle"}`}
              onClick={() => setSlide(index)}
            ></i>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
