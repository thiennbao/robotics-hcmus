import { courseAPI, registrationAPI } from "api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import style from "./SingleCoursePage.module.scss";
import Appearance from "components/Appearance";
import Heading from "components/Heading";
import Wallpaper from "components/Wallpaper";
import SiteLayout from "layouts/SiteLayout";
import { TypingFeild } from "components/Editor";

const SingleCoursePage = () => {
  const id = useLocation().pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const [course, setCourse] = useState({});
  useEffect(() => {
    courseAPI
      .getCourse(id)
      .then((res) => {
        setCourse(res.data);
        setValue("course", res.data.name);
      })
      .catch((error) => console.log(error));
  }, [id, setValue]);

  const onSubmit = (data) => {
    registrationAPI.createRegistration(data).then(() => {
      window.alert("Register successfully !!!");
      reset()
    });
  };

  return (
    <SiteLayout>
      {course.name ? (
        <>
          <Wallpaper page={course.name} image={course.thumbnail} />
          <section className={style.courseDetail}>
            <div className="container">
              <div className="row gy-4 justify-content-between align-items-stretch">
                <div className="col-lg-5 col-md-6">
                  <Appearance type="right">
                    <Heading className="fs-2" subcontent="ABOUT">
                      {course.name}
                    </Heading>
                    <p>{course.description}</p>
                    <p>
                      <i className="bi bi-person-circle"></i> Age: {course.age}
                    </p>
                    <p>
                      <i className="bi bi-journals"></i> Lesson: {course.lesson}
                    </p>
                    <p>
                      <i className="bi bi-clock-fill"></i> Time: {course.time}m / class
                    </p>
                  </Appearance>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="row gy-lg-0 gy-3">
                    <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                      <img src={course.images[0]} alt="" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                      <img src={course.images[1]} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <Appearance type="up">
              <div className={style.form}>
                <Heading className="text-center fs-2">Register this course</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input hidden register={register("course")} />
                  <TypingFeild
                    label="Name"
                    placeholder="Name"
                    register={register("name", { required: true })}
                    aria-invalid={!!errors.name}
                    onFocus={() => clearErrors("name")}
                  />
                  <TypingFeild
                    label="Phone"
                    placeholder="Phone"
                    register={register("phone", { required: true })}
                    aria-invalid={!!errors.phone}
                    onFocus={() => clearErrors("phone")}
                  />
                  <TypingFeild
                    label="Email"
                    placeholder="Email"
                    type="email"
                    register={register("email", { required: true })}
                    aria-invalid={!!errors.email}
                    onFocus={() => clearErrors("email")}
                  />
                  <TypingFeild
                    label="Message"
                    textarea
                    placeholder="Message"
                    register={register("message", { required: true })}
                    aria-invalid={!!errors.message}
                    onFocus={() => clearErrors("message")}
                  />
                  <div className="mt-3">
                    <input type="submit" value="SEND MESSAGE" />
                  </div>
                </form>
              </div>
            </Appearance>
          </section>
          <section className={style.images}>
            <div className="container-fluid">
              <div className="row g-1">
                {course.images.slice(2).map((image) => (
                  <div key={image} className="col-sm-6 col-md-4">
                    <img src={image} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className={style.loading}>
          <h3>
            <span>Loading</span>
            <span className="spinner-border mx-3" role="status"></span>
          </h3>
        </section>
      )}
    </SiteLayout>
  );
};

export default SingleCoursePage;
