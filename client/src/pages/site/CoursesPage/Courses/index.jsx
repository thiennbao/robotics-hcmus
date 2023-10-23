import { useEffect, useState } from "react";
import { courseAPI } from "api";
import clsx from "clsx";
import style from "./Courses.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";

const Course = ({ id, thumbnail, name, description, age, lesson, time }) => {
  return (
    <div className={clsx(style.course, "d-flex flex-column")}>
      <div>
        <img src={thumbnail} alt="" />
      </div>
      <div className="container-fluid flex-grow-1 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column">
          <h3 className="flex-grow-1">{name}</h3>
          <p className="">{description}</p>
        </div>
        <div className="row d-flex text-center">
          <p className="col-4">
            <span>{age}</span> Year olds
          </p>
          <p className="col-4">
            <span>{lesson}</span> Lessons
          </p>
          <p className="col-4">
            <span>{time} m</span> 1 Class
          </p>
        </div>
        <Button variant="outline" className={style.detailButton} to={`/courses/${id}`}>
          See details
        </Button>
      </div>
    </div>
  );
};

const Courses = ({ limit }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    courseAPI
      .getCourses(0, limit)
      .then((res) => setCourses(res.data))
      .catch((error) => console.log(error));
  }, [limit]);

  return (
    <Section className={style.courses}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">{limit && "POPULAR"} COURSES</Heading>
        <div className="row gy-5 my-3">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6 d-flex">
              <Appearance
                className="d-flex"
                type={index % 2 ? "right" : "left"}
                animation={{ delay: `${index * 0.1}s` }}
              >
                <Course
                  id={course._id}
                  thumbnail={course.thumbnail}
                  name={course.name}
                  description={course.description.slice(0, 200) + "..."}
                  age={course.age}
                  lesson={course.lesson}
                  time={course.time}
                />
              </Appearance>
            </div>
          ))}
        </div>
        {limit && (
          <Appearance type="up">
            <Button className={style.button} variant="shadow" to="/courses">
              See all courses
            </Button>
          </Appearance>
        )}
      </div>
    </Section>
  );
};

export default Courses;
