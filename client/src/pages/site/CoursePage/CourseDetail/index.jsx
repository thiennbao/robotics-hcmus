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
import Appear from "components/Appear";

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
          <div className="row justify-content-between">
            <div className="col-lg-6 my-auto">
              <Appear variant="right">
                <h2 className="mb-5">{course.name}</h2>
              </Appear>
              <ul className="list-unstyled">
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-info-circle me-4 my-auto"></i>
                      <span className="py-1">Description: {course.description}</span>
                    </div>
                  </Appear>
                </li>
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-check2-all me-4 my-auto"></i>
                      <span className="py-1">Aim: {course.aim}</span>
                    </div>
                  </Appear>
                </li>
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-person me-4 my-auto"></i>
                      <span className="py-1">Age: {course.age}</span>
                    </div>
                  </Appear>
                </li>
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-journals me-4 my-auto"></i>
                      <span className="py-1">Lessons: {course.lesson}</span>
                    </div>
                  </Appear>
                </li>
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-clock me-4 my-auto"></i>
                      <span className="py-1">Duration: {course.duration}</span>
                    </div>
                  </Appear>
                </li>
                <li>
                  <Appear variant="right">
                    <div className="d-flex mb-3">
                      <i className="bi bi-exclamation-circle me-4 my-auto"></i>
                      <span className="py-1">Requirement: {course.requirement}</span>
                    </div>
                  </Appear>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 overflow-hidden">
              {!!course.images.length && (
                <Appear variant="left">
                  <SlideShow contents={course.images} ContentTag={Item} prevnext />
                </Appear>
              )}
            </div>
          </div>
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
