import { courseAPI } from "api";
import Appearance from "components/Appearance";
import Heading from "components/Heading";
import Wallpaper from "components/Wallpaper";
import SiteLayout from "layouts/SiteLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import style from "./SingleCoursePage.module.scss";
import FooterImages from "components/FooterImages";

const SingleCoursePage = () => {
  const id = useLocation().pathname.split("/")[2];

  const [course, setCourse] = useState({});
  useEffect(() => {
    courseAPI
      .getCourse(id)
      .then((res) => setCourse(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const onSubmit = (data) => {
    // Wating for backend
    console.log(data);
  };

  return (
    <SiteLayout>
      <Wallpaper page={course.name} image={course.thumbnail} />
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <Heading className="fs-2 text-center" subcontent="ABOUT">
              {course.name}
            </Heading>
            <p className="my-4">{course.description}</p>
            <p className="d-flex justify-content-around">
              <span>Age: {course.age}</span>
              <span>Lesson: {course.lesson}</span>
              <span>Time: {course.time}h / lesson</span>
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row g-1">
            {course.images && course.images.map((image, index) => (
              <div className="col-4">
                <img key={index} src={image} alt="" className={style.image} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container">
        <div className={style.form}>
          <Appearance type="up">
            <Heading className="text-center fs-2">Register this course</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    {...register("name", { required: true })}
                    aria-invalid={!!errors.name}
                    onFocus={() => clearErrors("name")}
                  />
                  {errors.name && <span>Please fill out this field</span>}
                </div>
                <div className="col-md-6">
                  <label>Phone</label>
                  <input
                    placeholder="Phone"
                    {...register("phone", { required: true })}
                    aria-invalid={!!errors.phone}
                    onFocus={() => clearErrors("phone")}
                  />
                  {errors.phone && <span>Please fill out this field</span>}
                </div>
                <div>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    {...register("email", { required: true })}
                    aria-invalid={!!errors.email}
                    onFocus={() => clearErrors("email")}
                  />
                  {errors.email && <span>Please fill out this field</span>}
                </div>
                <div>
                  <label>Subject</label>
                  <input
                    placeholder="Subject"
                    {...register("subject", { required: true })}
                    aria-invalid={!!errors.subject}
                    onFocus={() => clearErrors("subject")}
                  />
                  {errors.subject && <span>Please fill out this field</span>}
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    placeholder="Message"
                    {...register("message", { required: true })}
                    aria-invalid={!!errors.message}
                    onFocus={() => clearErrors("message")}
                  />
                  {errors.message && <span>Please fill out this field</span>}
                </div>
                <input type="submit" value="SEND MESSAGE" />
              </div>
            </form>
          </Appearance>
        </div>
      </section>
      <FooterImages />
    </SiteLayout>
  );
};

export default SingleCoursePage;
