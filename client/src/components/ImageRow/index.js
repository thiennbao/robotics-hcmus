import clsx from "clsx";
import style from "./ImageRow.module.scss";

const ImageRow = ({ images, height, brightness, contents, fontSize }) => {
  return (
    <div className="d-flex">
      {images.map((img, index) => (
        <div
          key={index}
          style={{ width: `${100 / images.length}%`, height }}
          className={clsx(style.container, "position-relative")}
        >
          <span
            className="position-absolute top-50 start-50 translate-middle z-1 text-white"
            style={{ fontSize }}
          >
            {contents && contents[index]}
          </span>
          <img
            style={{ filter: `brightness(${brightness})` }}
            src={img}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default ImageRow;
