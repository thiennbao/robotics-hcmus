import clsx from "clsx";
import style from "./FooterImages.module.scss";

import image from "assets/gallery/about-1.jpg";
import Appearance from "components/Appearance";

const images = [image, image, image, image, image, image];

const FooterImages = () => {
  return (
    <div className={style.footerImages}>
      <div className="row g-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={clsx("col-lg-2 col-md-4 col-6", index > 2 && "d-md-none d-lg-block")}
          >
            <Appearance type="up" animation={{ delay: `${index * 0.1}s` }}>
              <img src={image} alt="Footer" />
            </Appearance>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterImages;
