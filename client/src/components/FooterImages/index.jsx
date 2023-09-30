import clsx from "clsx";
import style from "./FooterImages.module.scss";

import image from "assets/gallery/about-1.jpg";

const images = [image, image, image, image, image, image];

const FooterImages = () => {
  return (
    <div className={style.footerImages}>
      <div className="row g-0">
        {images.map((image, index) => (
          <div key={index} className={clsx("col-lg-2 col-md-4 col-6", index > 2 && "d-md-none d-lg-block")}>
            <img src={image} alt="Footer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterImages;
