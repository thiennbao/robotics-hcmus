import clsx from "clsx";
import style from "./Special.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import image from "assets/gallery/about-2.jpg";
import Appearance from "components/Appearance";

const Feature = ({ title, content }) => {
  return (
    <div className={clsx(style.feature, "d-flex")}>
      <div className="d-flex align-items-center px-sm-4 px-3">
        <i className="bi bi-check-circle"></i>
      </div>
      <div>
        <p className="my-2">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Special = () => {
  return (
    <Section wavy className={style.special}>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xl-5 col-lg-6 col-md-8 mb-4">
            <Heading subcontent="--- WELCOME TO">SPECIAL</Heading>
            <p className="my-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <Appearance type="right">
              <Feature
                title="Lorem ipsum"
                content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
              />
            </Appearance>
            <Appearance type="right">
              <Feature
                title="Lorem ipsum"
                content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
              />
            </Appearance>
            <Appearance type="right">
              <Feature
                title="Lorem ipsum"
                content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
              />
            </Appearance>
            <Appearance type="right">
              <Feature
                title="Lorem ipsum"
                content="Malesuada elementum curabitur massa pellentesque fames at dui eu justo"
              />
            </Appearance>
          </div>
          <div className="col-lg-6 col-md-4 d-flex">
            <Appearance type="left">
              <img src={image} alt="" />
            </Appearance>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Special;
