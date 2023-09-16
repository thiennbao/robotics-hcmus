import style from './Courses.module.scss'
import Heading from "components/Heading";
import Course from "./Course";
import Button from "components/Button";

const Courses = ({ limit }) => {
  // Call API
  const image = require("assets/about-2.jpg");
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
    <section>
      <div className="container">
        <Heading Tag="h2" extra subcontent="--- WELCOME TO">POPULAR COURSES</Heading>
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-4 g-5">
              <Course
                image={course.image}
                title={course.title}
                description={course.description}
                yearOlds={course.yearOlds}
                classes={course.classes}
                hours={course.hours}
              />
            </div>
          ))}
        </div>
        {limit && <Button className={style.btn} type="shadow" to="/courses">See all courses</Button> }
      </div>
    </section>
  );
};

export default Courses;
