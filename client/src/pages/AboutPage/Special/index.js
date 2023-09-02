import clsx from "clsx";
import style from "./Special.module.scss";
import Heading from "components/Heading";
import image from "assets/about-2.jpg";

const Feature = ({ title, content }) => {
  return (
    <div className="d-flex">
      <div className="d-flex me-4">
        <i className={clsx(style.icon, "bi bi-check2-circle")}></i>
      </div>
      <div>
        <p className="fs-3">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Special = () => {
  return (
    <section className="container">
      <div className="row justify-content-between">
        <div className="col-5">
          <Heading Tag="h2" extra subcontent="--- WELCOME TO">
            SPECIAL
          </Heading>
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <Feature
            title="Lorem ipsum"
            content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
          />
          <Feature
            title="Lorem ipsum"
            content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
          />
          <Feature
            title="Lorem ipsum"
            content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
          />
          <Feature
            title="Lorem ipsum"
            content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
          />
        </div>
        <div className="col-6">
          <img className={style.img} src={image} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Special;
