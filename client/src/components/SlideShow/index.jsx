import { useEffect, useRef, useState } from "react";
import style from "./SlideShow.module.scss";

const SlideShow = ({ contents, ContentTag, itemsPerScreen, circles, prevnext }) => {
  const ref = useRef();

  const [slide, setSlide] = useState(0);
  const [dragging, setDragging] = useState(0);

  useEffect(() => {
    if (dragging) {
      const handleDrag = (e) => {
        ref.current.style.transform = `translateX(${
          -slide * (window.innerWidth / itemsPerScreen) + e.clientX - dragging
        }px)`;
      };
      window.addEventListener("mousemove", handleDrag);
      const handleDrop = (e) => {
        if (e.clientX - dragging > 100) {
          setSlide(slide === 0 ? slide : slide - 1);
        } else if (e.clientX - dragging < -100) {
          setSlide(slide === contents.length - itemsPerScreen ? slide : slide + 1);
        }
        setDragging(0);
      };
      window.addEventListener("mouseup", handleDrop);

      return () => {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("mouseup", handleDrop);
      };
    }
  }, [dragging, slide, contents, itemsPerScreen]);

  if (ref.current) {
    ref.current.style.transform = `translateX(${(-slide * 100) / contents.length}%)`;
    ref.current.style.cursor = dragging ? "grabbing" : "grab";
  }

  return (
    <div className={style.slideShow}>
      <div
        ref={ref}
        onMouseDown={(e) => setDragging(e.clientX)}
        className={style.wrapper}
        style={{ width: `${contents.length * (100 / itemsPerScreen)}%` }}
      >
        {contents.map((item, index) => (
          <div key={index} style={{ width: `${100 / contents.length}%` }}>
            <ContentTag content={item} />
          </div>
        ))}
      </div>
      {circles && (
        <div className={style.circles}>
          {contents.map((item, index) => (
            <i
              key={index}
              className={`bi bi-${index === slide ? "circle-fill" : "circle"}`}
              onClick={() => setSlide(index)}
            ></i>
          ))}
        </div>
      )}
      {prevnext && (
        <div className={style.prevnext}>
          <i
            onClick={() => setSlide(slide === 0 ? slide : slide - 1)}
            className="bi bi-caret-left-fill"
          ></i>
          <i
            onClick={() => setSlide(slide === contents.length - itemsPerScreen ? slide : slide + 1)}
            className="bi bi-caret-right-fill"
          ></i>
        </div>
      )}
    </div>
  );
};

export default SlideShow;
