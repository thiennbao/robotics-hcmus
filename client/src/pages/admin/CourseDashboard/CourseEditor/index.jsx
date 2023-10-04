import { useEffect } from "react";
import { courseAPI } from "api";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import style from "./CourseEditor.module.scss";

const CourseEditor = ({ editCourse, setEditCourse }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const handleSave = (data) => {
    courseAPI.editCourse(editCourse, data);
  };

  const handleCancel = () => {
    setEditCourse();
  };

  useEffect(() => {
    courseAPI.getCourse(editCourse).then((res) => {
      setValue("name", res.data.name);
      setValue("tuition", res.data.tuition);
      setValue("description", res.data.description);
      setValue("age", res.data.age);
      setValue("lesson", res.data.lesson);
      setValue("time", res.data.time);
    });
  }, [editCourse, setValue]);

  return (
    <div className={style.editor}>
      <h3>Edit course</h3>
      <form onSubmit={handleSubmit(handleSave)}>
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
          <label>Thumbnail</label>
          <input
            type="file"
            {...register("thumbnail", { required: false })}
            aria-invalid={!!errors.thumbnail}
            onFocus={() => clearErrors("thumbnail")}
          />
          <div className={style.thumbnail}>
            <img
              src={"https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg"}
              alt="Preview"
            />
          </div>
        </div>
        <div className={style.inputWrapper}>
          <label>Tuition</label>
          <input
            type="number"
            placeholder="Tuition"
            {...register("tuition", { required: true })}
            aria-invalid={!!errors.tuition}
            onFocus={() => clearErrors("tuition")}
          />
        </div>
        <div className={style.inputWrapper}>
          <label>Description</label>
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            aria-invalid={!!errors.description}
            onFocus={() => clearErrors("description")}
          />
        </div>
        <div className={style.inputWrapper}>
          <label>Age</label>
          <input
            placeholder="Age"
            {...register("age", { required: true })}
            aria-invalid={!!errors.age}
            onFocus={() => clearErrors("age")}
          />
        </div>
        <div className={style.inputWrapper}>
          <label>Lesson</label>
          <input
            type="number"
            placeholder="Lesson"
            {...register("lesson", { required: true })}
            aria-invalid={!!errors.lesson}
            onFocus={() => clearErrors("lesson")}
          />
        </div>
        <div className={style.inputWrapper}>
          <label>Time</label>
          <input
            type="number"
            placeholder="Time"
            {...register("time", { required: true })}
            aria-invalid={!!errors.time}
            onFocus={() => clearErrors("time")}
          />
        </div>
        <div className={style.inputWrapper}>
          <label>Images</label>
          <input
            type="file"
            multiple
            {...register("images", { required: false })}
            aria-invalid={!!errors.images}
            onFocus={() => clearErrors("images")}
          />
          <div className={style.images}>
            <div className="row g-1">
              <div className="col-6">
                <img
                  src={"https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg"}
                  alt="Preview"
                />
              </div>
              <div className="col-6">
                <img
                  src={"https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg"}
                  alt="Preview"
                />
              </div>
              <div className="col-6">
                <img
                  src={"https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg"}
                  alt="Preview"
                />
              </div>
              <div className="col-6">
                <img
                  src={"https://i.kym-cdn.com/photos/images/newsfeed/002/652/426/725.jpg"}
                  alt="Preview"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.buttons}>
          <input type="submit" value="SAVE" />
          <Button
            type="outline"
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditor;
