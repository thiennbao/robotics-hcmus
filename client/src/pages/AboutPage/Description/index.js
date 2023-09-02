import clsx from "clsx";
import style from "./Description.module.scss";
import Button from "components/Button";
import about1 from "assets/about-1.jpg";
import about2 from "assets/about-2.jpg";
import Heading from "components/Heading";

const Description = () => {
  return (
    <section className={clsx(style.description, "container")}>
      <div className="row justify-content-between">
        <div className="col-5">
          <Heading Tag="h2" extra subcontent="WHO WE ARE">Robotics & IoT - HCMUS</Heading>
          <div className="my-5">
            <p>Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.</p>
            <p>Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.</p>
            <p>Placerat dictum curabitur ridiculus laoreet tortor. Ipsum pellentesque inceptos porta phasellus quisque cubilia nullam vestibulum. Nunc dis eros congue et eleifend natoque.</p>
          </div>
          <Button className={style.btn} type="shadow" to="/">
            Learn more
          </Button>
        </div>
        <div className="col-6 row">
          <div className="col-6">
            <img src={about1} alt="" />
          </div>
          <div className="col-6">
            <img src={about2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
