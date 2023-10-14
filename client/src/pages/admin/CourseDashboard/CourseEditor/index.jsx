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
    getValues,
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
      dispatch(editCourse({ id, data }));
    } else {
      dispatch(createCourse(data));
    }
    setId();
  };

  const handleUploadThumbnail = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValue("thumbnail", reader.result);
    };
  };
  const handleUploadImage = (files) => {
    const images = getValues("images") || [];
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onloadend = () => {
        images.push(reader.result);
        setValue("images", images);
      };
    }
  };
  const handleRemoveImage = (removeIndex) => {
    setValue(
      "images",
      getValues("images").filter((image, index) => index !== removeIndex)
    );
  };

  return (
    <div className={style.editor}>
      {!id || watch("name") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? `Edit ${watch("name")}` : "Add course"}</h3>
          <div>
            <label>Name</label>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
              aria-invalid={!!errors.name}
              onFocus={() => clearErrors("name")}
            />
          </div>
          <div>
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
              <div className="mt-2">
                <img className={style.thumbnail} src={watch("thumbnail")} alt="Preview" />
              </div>
            )}
          </div>
          <div>
            <label>Tuition</label>
            <input
              type="number"
              placeholder="Tuition"
              {...register("tuition", { required: true })}
              aria-invalid={!!errors.tuition}
              onFocus={() => clearErrors("tuition")}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="Description"
              {...register("description", { required: true })}
              aria-invalid={!!errors.description}
              onFocus={() => clearErrors("description")}
            />
          </div>
          <div className="row">
            <div className="col-4">
              <label>Age</label>
              <input
                placeholder="Age"
                {...register("age", { required: true })}
                aria-invalid={!!errors.age}
                onFocus={() => clearErrors("age")}
              />
            </div>
            <div className="col-4">
              <label>Lesson</label>
              <input
                type="number"
                placeholder="Lesson"
                {...register("lesson", { required: true })}
                aria-invalid={!!errors.lesson}
                onFocus={() => clearErrors("lesson")}
              />
            </div>
            <div className="col-4">
              <label>Time</label>
              <input
                type="number"
                placeholder="Time"
                {...register("time", { required: true })}
                aria-invalid={!!errors.time}
                onFocus={() => clearErrors("time")}
              />
            </div>
          </div>
          <div>
            <label>Images</label>
            <input hidden {...register("images")} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUploadImage(e.target.files)}
            />
            {watch("images") && watch("images")[0] && (
              <div className="mt-2 container-fluid">
                <div className="row">
                  {watch("images").map((img, index) => (
                    <div key={index} className="p-0 col-6 position-relative overflow-hidden">
                      <img className={style.image} src={img} alt="Preview" />
                      <Button
                        color="red"
                        type="button"
                        className="position-absolute top-0 end-0 p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={style.buttons}>
            <Button variant="outline" color="green" type="submit">
              SAVE
            </Button>
            <Button variant="outline" color="red" type="button" onClick={() => setId()}>
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
