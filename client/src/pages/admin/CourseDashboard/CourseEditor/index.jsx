import { useEffect } from "react";
import { courseAPI } from "api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCourse, editCourse } from "../courseSlice";
import Button from "components/Button";
import style from "./CourseEditor.module.scss";

const CourseEditor = ({ id, setId }) => {
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
      courseAPI
        .getCourse(id)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("tuition", res.data.tuition);
          setValue("thumbnail", res.data.thumbnail);
          setValue("description", res.data.description);
          setValue("age", res.data.age);
          setValue("lesson", res.data.lesson);
          setValue("time", res.data.time);
          setValue("images", res.data.images);
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  const handleSave = (data) => {
    if (id) {
      dispatch(editCourse({id, data}));
    } else {
      dispatch(createCourse(data))
    }
    setId();
  };

  const handleUploadThumbnail = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("thumbnail", reader.result.toString());
      };
    }
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

  return (
    <div className={style.editor}>
      {!id || watch("name") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("name") : "Add course"}</h3>
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
            <input hidden {...register("thumbnail", { required: true })} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadThumbnail(e.target.files[0])}
              aria-invalid={!!errors.thumbnail}
              onFocus={() => clearErrors("thumbnail")}
            />
            {watch("thumbnail") && (
              <div className={style.thumbnail}>
                <img src={watch("thumbnail")} alt="Preview" />
              </div>
            )}
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
          <div className={style.buttons}>
            <input type="submit" value="SAVE" />
            <Button type="outline" onClick={() => setId()}>
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

export default CourseEditor;
