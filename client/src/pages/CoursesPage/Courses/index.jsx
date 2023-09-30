import style from "./Courses.module.scss";
import Section from "layouts/partials/Section";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";

const Course = ({ image, title, description, yearOlds, classes, hours }) => {
  return (
    <div className={style.course}>
      <div>
        <img src={image} alt="" />
      </div>
      <div className="container-fluid">
        <h3>{title}</h3>
        <p className="">{description}</p>
        <div className="row d-flex text-center">
          <p className="col-4">
            <span>{yearOlds}</span> Year olds
          </p>
          <p className="col-4">
            <span>{classes}</span> Classes
          </p>
          <p className="col-4">
            <span>{hours}</span> 1 Class
          </p>
        </div>
        <Button type="outline" className={style.detailButton}>See details</Button>
      </div>
    </div>
  );
};

const Courses = ({ limit }) => {
  // Call API
  const image = require("assets/gallery/about-2.jpg");
  const courses = [
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
    {
      image: image,
      title: "Lorem Lmao",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      yearOlds: "12-21",
      classes: "8",
      hours: "2h",
    },
  ];

  return (
    <Section className={style.courses}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">{limit && "POPULAR"} COURSES</Heading>
        <div className="row gy-5 my-3">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <Appearance type={index % 2 ? "right" : "left"} animation={{ delay: `${index * 0.1}s` }}>
                <Course
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  yearOlds={course.yearOlds}
                  classes={course.classes}
                  hours={course.hours}
                />
              </Appearance>
            </div>
          ))}
        </div>
        {limit && (
          <Appearance type="up">
            <Button className={style.button} type="shadow" to="/courses">
              See all courses
            </Button>
          </Appearance>
        )}
      </div>
    </Section>
  );
};

export default Courses;
