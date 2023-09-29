import clsx from "clsx";
import style from "./Description.module.scss";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";

import about1 from "assets/gallery/about-1.jpg";
import about2 from "assets/gallery/about-2.jpg";

const Description = () => {
  return (
    <section className={style.description}>
      <div className="container">
        <div className="row gy-4 justify-content-between">
          <div className="col-lg-5 col-md-6">
            <Appearance type="right">
              <Heading Tag="h2" extra subcontent="WHO WE ARE">
                Robotics & IoT - HCMUS
              </Heading>
              <div className="my-5">
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
              </div>
              <Button className={clsx("m-md-0 m-auto", style.btn)} type="shadow" to="/">
                Learn more
              </Button>
            </Appearance>
          </div>
          <div className={clsx("col-md-6", style.images)}>
            <div className=" row gy-lg-0 gy-3">
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <Appearance type="up">
                  <img src={about1} alt="" />
                </Appearance>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <Appearance type="down">
                  <img src={about2} alt="" />
                </Appearance>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
