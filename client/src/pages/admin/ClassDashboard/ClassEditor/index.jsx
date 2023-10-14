import { useEffect, useState } from "react";
import { classAPI, courseAPI, memberAPI } from "api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createClass, editClass } from "../classSlice";
import Button from "components/Button";
import style from "./ClassEditor.module.scss";

const ClassEditor = ({ id, setId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  useEffect(() => {
    if (id) {
      classAPI
        .getClass(id)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("course", res.data.course);
          setValue("time", res.data.time);
          setValue("date", res.data.date);
          setValue("teacher", res.data.teacher);
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  const handleSave = (data) => {
    if (id) {
      dispatch(editClass({ id, data }));
    } else {
      dispatch(createClass(data));
    }
    setId();
  };

  const handleUploadImages = (files) => {
    if (files) {
      const images = [];
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onloadend = () => {
          images.push(reader.result);
          setValue("images", images);
        };
      }
    }
  };

  const [courses, setCourses] = useState();
  const [members, setMembers] = useState();
  useEffect(() => {
    courseAPI
      .getCourses()
      .then((res) => setCourses(res.data))
      .catch((error) => console.log(error));
    memberAPI
      .getMembers()
      .then((res) => setMembers(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={style.editor}>
      {!id || watch("name") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("name") : "Add class"}</h3>
          <div className={style.inputWrapper}>
            <label>Name</label>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
              aria-invalid={!!errors.name}
              onFocus={() => clearErrors("name")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Course</label>
            <select
              value={watch("course")}
              {...register("course", { required: true })}
              aria-invalid={!!errors.course}
              onFocus={() => clearErrors("course")}
            >
              <option></option>
              {courses &&
                courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.inputWrapper}>
            <label>Time</label>
            <input
              type="time"
              placeholder="Time"
              {...register("time", { required: true })}
              aria-invalid={!!errors.time}
              onFocus={() => clearErrors("time")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Date</label>
            <select
              value={watch("date")}
              {...register("date", { required: true })}
              aria-invalid={!!errors.date}
              onFocus={() => clearErrors("date")}
            >
              <option></option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>
          <div className={style.inputWrapper}>
            <label>Teacher</label>
            <select
              value={watch("teacher")}
              {...register("teacher", { required: true })}
              aria-invalid={!!errors.teacher}
              onFocus={() => clearErrors("teacher")}
            >
              <option></option>
              {members &&
                members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.inputWrapper}>
            <label>Students</label>
            <input readOnly placeholder="Waiting for student dashboard" />
          </div>
          {!!id && (
            <div className={style.inputWrapper}>
              <label>Images</label>
              <input hidden {...register("images")} />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleUploadImages(e.target.files)}
              />
              {watch("images") && watch("images")[0] && (
                <div className={style.images}>
                  <div className="row g-1">
                    {watch("images").map((img, index) => (
                      <div key={index} className="col-6">
                        <img src={img} alt="Preview" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className={style.buttons}>
            <input type="submit" value="SAVE" />
            <Button variant="outline" onClick={() => setId()}>
              CANCEL
            </Button>
          </div>
        </form>
      ) : (
        <h3>
          <span>Loading</span>
          <span className="spinner-border mx-3" role="status"></span>
        </h3>
      )}
    </div>
  );
};

export default ClassEditor;
