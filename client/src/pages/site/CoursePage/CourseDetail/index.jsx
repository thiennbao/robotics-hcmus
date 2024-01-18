import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resourceApi } from "api";
import style from "./CourseDetail.module.scss";
import SiteLayout from "layouts/SiteLayout";
import Wallpaper from "components/Wallpaper";
import Button from "components/Button";
import Loading from "components/Loading";
import SlideShow from "components/SlideShow";

const Item = ({ content }) => {
  return <img src={content} alt="" />;
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  useEffect(() => {
    resourceApi
      .getSingleResource({ resource: "course", id })
      .then((res) => setCourse(res.data))
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const submit = (data) => {
    data.subject = `[Register] ${course.name}`;
    resourceApi
      .postResource({ resource: "contact", data })
      .then(() => {
        window.alert("Register successfully");
        reset();
      })
      .catch((error) => {
        window.alert(`An unexpected error has occurred (${error.message}). Please try again`);
      });
  };

  return !course.name ? (
    <div className={style.loading}>
      <Loading />
    </div>
  ) : (
    <SiteLayout>
      <Wallpaper title={course.name} background={course.thumbnail} />
      <section className={style.courseDetail}>
        <div className="container">
          <div className="row gy-md-0 gy-4 justify-content-between">
            <div className="col-lg-6 col-md-8 my-auto">
              <h2>{course.name}</h2>
              <p>{course.description}</p>
            </div>
            <div className="col-lg-5 col-md-4 my-auto">
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
          </div>
        </div>
        <div className="container mt-5 overflow-hidden p-0">
          <SlideShow
            contents={course.images}
            ContentTag={Item}
            prevnext
            itemsPerScreen={window.innerWidth > 992 ? 4 : window.innerWidth > 768 ? 2 : 1}
          />
        </div>
      </section>
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
    </SiteLayout>
  );
};

export default CourseDetail;
