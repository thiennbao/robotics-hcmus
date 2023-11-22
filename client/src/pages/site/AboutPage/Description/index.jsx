import clsx from "clsx";
import style from "./Description.module.scss";
import Button from "components/Button";
import Appear from "components/Appear";
import { photos } from "assets";

const Description = () => {
  return (
    <section className={clsx(style.description, "d-flex")}>
      <div className="container d-flex">
        <div className="row gy-md-0 gy-4 justify-content-between">
          {/* Text */}
          <div className="col-lg-5 col-md-6 pe-5 my-auto">
            <h2>Robotics & IoT - HCMUS</h2>
            <div className="my-lg-5">
              <Appear variant="right">
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
              </Appear>
              <Appear variant="right">
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
              </Appear>
              <Appear variant="right">
                <p>
                  Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos
                  porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et
                  eleifend natoque.
                </p>
              </Appear>
            </div>
            <Button className={clsx("m-md-0 m-auto", style.button)} variant="outline" to="/about">
              Learn more
            </Button>
          </div>
          {/* Images */}
          <div className="col-lg-7 col-md-6 d-flex">
            <div className="row gy-lg-0 gy-3">
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <Appear variant="up">
                  <img src={photos[0]} alt="" />
                </Appear>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <Appear variant="down">
                  <img src={photos[1]} alt="" />
                </Appear>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
