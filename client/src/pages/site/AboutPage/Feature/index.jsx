import clsx from "clsx";
import style from "./Feature.module.scss";
import Appear from "components/Appear";
import { photos } from "assets";

const Item = ({ title, content }) => {
  return (
    <div className={clsx(style.item, "d-flex")}>
      <div className="d-flex align-items-center me-3">
        <i className="bi bi-check-circle"></i>
      </div>
      <div>
        <p className="m-0">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Feature = () => {
  return (
    <section className={clsx(style.feature, "d-flex")}>
      <div className="container d-flex">
        <div className="row justify-content-between">
          {/* Text */}
          <div className="col-xl-5 col-lg-6 col-md-8 my-auto">
            <h2>Features</h2>
            <p className="my-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div>
              <Appear variant="right">
                <Item
                  title="Lorem ipsum"
                  content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
                />
              </Appear>
              <Appear variant="right">
                <Item
                  title="Lorem ipsum"
                  content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
                />
              </Appear>
              <Appear variant="right">
                <Item
                  title="Lorem ipsum"
                  content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
                />
              </Appear>
              <Appear variant="right">
                <Item
                  title="Lorem ipsum"
                  content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
                />
              </Appear>
            </div>
          </div>
          {/* Image */}
          <div className="col-lg-6 col-md-4 d-flex">
            <Appear variant="left">
              <img src={photos[3]} alt="" />
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
