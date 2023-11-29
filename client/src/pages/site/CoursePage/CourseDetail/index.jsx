import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resourceApi } from "api";
import style from "./CourseDetail.module.scss";
import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Button from "components/Button";
import Loading from "components/Loading";

const Detail = ({ course }) => {
  return (
    <section className={style.courseDetail}>
      <div className="container d-flex">
        <div className="row gy-md-0 gy-4 justify-content-between">
          <div className="col-lg-5 col-md-6 pe-5 my-auto">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-coin"></i> Tuition: {course.tuition}
              </li>
              <li>
                <i className="bi bi-person"></i> Age: {course.age}
              </li>
              <li>
                <i className="bi bi-journals"></i> Lessons: {course.lesson}
              </li>
              <li>
                <i className="bi bi-clock"></i> Time: {course.time}
              </li>
            </ul>
          </div>
          <div className="col-lg-7 col-md-6 d-flex">
            <div className="row gy-lg-0 gy-3">
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <img src={course.images[1]} alt="" />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-6 col-12 d-flex">
                <img src={course.images[0]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const submit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className={style.registerForm}>
      <div className={style.wrapper}>
        <h2>Register this course</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register("name", { required: true })}
            aria-invalid={!!errors.name}
            onFocus={() => clearErrors("name")}
            placeholder="Name"
          />
          <input
            {...register("phone", { required: true })}
            aria-invalid={!!errors.phone}
            onFocus={() => clearErrors("phone")}
            placeholder="Phone"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            aria-invalid={!!errors.email}
            onFocus={() => clearErrors("email")}
            placeholder="Email"
          />
          <textarea
            {...register("message", { required: true })}
            aria-invalid={!!errors.message}
            onFocus={() => clearErrors("message")}
            placeholder="Message"
          />
          <Button className={style.button} variant="outline">
            REGISTER
          </Button>
        </form>
      </div>
    </section>
  );
};

const CourseDetail = () => {
  const id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  useEffect(() => {
    resourceApi
      .getSingleResource({ resource: "course", id })
      .then((res) => setCourse(res.data))
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  return !course.name ? (
    <div className={style.loading}>
      <Loading />
    </div>
  ) : (
    <SiteLayout>
      <Wallpaper title={course.name} background={course.thumbnail} />
      <Detail course={course} />
      <RegisterForm />
    </SiteLayout>
  );
};

export default CourseDetail;
