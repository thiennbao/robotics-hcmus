import clsx from "clsx";
import style from "./ImageRow.module.scss";

import img1 from "assets/gallery/course-1.jpg";
import img2 from "assets/gallery/course-2.jpg";
import img3 from "assets/gallery/course-3.jpg";
import img4 from "assets/gallery/course-4.jpg";
import Appearance from "components/Appearance";

const items = [
  { image: img1, content: "WE LIVE" },
  { image: img2, content: "WE LOVE" },
  { image: img3, content: "WE LIE" },
  { image: img4, content: "♪ ♪ ♪" },
];

const ImageRow = () => {
  return (
    <div className="row g-0">
      {items.map((item, index) => (
        <div key={index} className={clsx(style.container, "col-md-3 position-relative")}>
          <Appearance type="up" animation={{ delay: `${index * 0.1}s` }}>
            <span className="position-absolute top-50 start-50 translate-middle z-1 text-white">
              {item.content && item.content}
            </span>
            <img src={item.image} alt="" />
          </Appearance>
        </div>
      ))}
    </div>
  );
};

export default ImageRow;
